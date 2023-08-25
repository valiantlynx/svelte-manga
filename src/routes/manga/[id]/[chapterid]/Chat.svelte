<script lang="ts">
	import Login from './Login.svelte';
	import ChatMessage from './ChatMessage.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { authData } from '$lib/utils/stores';
	import { pb } from '$lib/utils/api';

	let newMessage: string;
	let messages: any[] = [];
	let unsubscribe: () => void;
	let scrollBottom: HTMLDivElement;
	let lastScrollTop: number;
	let canAutoScroll = true;
	let unreadMessages = false;

	function autoScroll() {
		setTimeout(() => scrollBottom?.scrollIntoView({ behavior: 'smooth' }), 50);
		unreadMessages = false;
	}

	function watchScroll(e: any) {
		canAutoScroll = (e.target.scrollTop || Infinity) > lastScrollTop;
		lastScrollTop = e.target.scrollTop;
		unreadMessages = !canAutoScroll;
	}

	async function getInitialMessages() {
		try {
			const resultList = await pb.collection('chat_valiantlynx').getList(1, 50, {
				sort: 'created',
				expand: 'sender'
			});

			return resultList.items;
		} catch (error) {
			console.error('Fetching initial messages error:', error);
			return [];
		}
	}

	async function handleRealtimeMessage({ action, record }: any) {
		try {
			if (action === 'create') {
				const sender = await pb.collection('users').getOne(record.sender);
				record.expand = { sender };
				messages = [...messages, record];

				console.log('unreadMessages before:', unreadMessages);
				if ($authData.id !== record.receiver) {
					unreadMessages = true;
				}
				console.log('unreadMessages after:', unreadMessages);
			}
			if (action === 'delete') {
				messages = messages.filter((m) => m.id !== record.id);
			}
		} catch (error) {
			console.error('Realtime message subscription error:', error);
		}
	}

	onMount(async () => {
		messages = await getInitialMessages();
		unsubscribe = await pb.collection('chat_valiantlynx').subscribe('*', handleRealtimeMessage);
	});

	onDestroy(() => {
		unsubscribe?.();
	});

	async function sendMessage() {
		const data = {
			message: newMessage,
			sender: $authData.id,
			receiver: $authData.id
		};
		await pb.collection('chat_valiantlynx').create(data);
		newMessage = '';
		canAutoScroll = true;
		autoScroll();
	}
</script>

<div class="container p-4 space-y-4">
	<h2 class="text-2xl font-bold mb-4">Join the Discussion</h2>

	<main class="overflow-y-auto max-h-[60vh]" on:scroll={watchScroll}>
		{#each messages as message (message.id)}
			<ChatMessage {message} sender={$authData.username} />
		{/each}
		<div class="dummy" bind:this={scrollBottom} />
	</main>

	{#if !canAutoScroll}
		<div class="text-center justify-center flex">
			<button on:click={autoScroll} class="btn btn-secondary">
				{#if unreadMessages}
					💬
				{/if}
				🡣
			</button>
		</div>
	{/if}

	<div class="border-t pt-4">
		{#if $authData.username}
			<form on:submit|preventDefault={sendMessage} class="space-x-2 flex items-center">
				<input
					type="text"
					placeholder="Type a message..."
					bind:value={newMessage}
					maxlength="100"
					class="input input-bordered flex-grow"
				/>
				<button type="submit" disabled={!newMessage} class="btn btn-primary"> Send </button>
			</form>
		{:else}
			<div class="text-center">
				<p class="mb-2 text-gray-600">Log in to join the conversation</p>
				<Login />
			</div>
		{/if}
	</div>
</div>
