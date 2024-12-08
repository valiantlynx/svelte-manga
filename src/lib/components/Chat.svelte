<script>
	import ChatMessage from './ChatMessage.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { pb } from '$lib/utils/api';

	const company = $page.data.companyData;
	let newMessage = '';
	/**
	 * @type {any[]}
	 */
	let messages = [];
	/**
	 * @type {() => void}
	 */
	let unsubscribe;
	/**
	 * @type {HTMLDivElement}
	 */
	let scrollBottom;
	/**
	 * @type {number}
	 */
	let lastScrollTop;
	let canAutoScroll = true;
	let unreadMessages = false;

	function autoScroll() {
		setTimeout(() => scrollBottom?.scrollIntoView({ behavior: 'smooth' }), 50);
		unreadMessages = false;
	}

	/**
	 * @param {any} e
	 */
	function watchScroll(e) {
		canAutoScroll = (e.target.scrollTop || Infinity) > lastScrollTop;
		lastScrollTop = e.target.scrollTop;
		unreadMessages = !canAutoScroll;
	}

	async function getInitialMessages() {
		try {
			const resultList = await pb.collection('chat_animevariant').getList(1, 50, {
				sort: 'created',
				filter: $page.params.chapterid
					? `mangaid="${$page.params.id}" && chapterid="${$page.params.chapterid}"`
					: `mangaid="${$page.params.id}"`,
				expand: 'sender'
			});
			return resultList.items;
		} catch (error) {
			console.error('Fetching initial messages error:', error);
			return [];
		}
	}

	/**
	 * @param {{ action: string; record: any; }} param0
	 */
	async function handleRealtimeMessage({ action, record }) {
		try {
			if (action === 'create') {
				const sender = await pb.collection('users').getOne(record.sender);

				record.expand = { sender };
				messages = [...messages, record];

				if ($page.data.user?.id !== record.receiver) {
					unreadMessages = true;
				}
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
		unsubscribe = await pb.collection('chat_animevariant').subscribe('*', handleRealtimeMessage);
	});

	onDestroy(() => {
		unsubscribe?.();
	});

	async function sendMessage() {
		const data = {
			sender: $page.data.user?.id ? $page.data.user?.id : 'cl1wlk9epnlmdsg',
			message: newMessage,
			chapterid: $page.params.chapterid,
			mangaid: $page.params.id,
			receiver: $page.data.user?.id ? $page.data.user?.id : 'cl1wlk9epnlmdsg',
		};
		await pb.collection('chat_animevariant').create(data);
		newMessage = '';
		canAutoScroll = true;
		autoScroll();
	}
</script>

<div class="space-y-4 items-center py-8">
	<div class="p-4 space-y-4 border-dashed border-2 border-primary">
		<h2 class="text-2xl font-bold mb-4">Join the Discussion</h2>
	
		<main class="overflow-y-auto" on:scroll={watchScroll}>
			{#each messages as message (message.id)}
				<ChatMessage {message} sender={$page.data.user?.username} />
			{/each}
		</main>

		<div class="border-t border-primary pt-4">
			<form on:submit|preventDefault={sendMessage} class="space-x-2 flex-col items-center">
				{#if !$page.data.user}
					<a href="/login" type="submit" class="btn btn-accent">login</a>
				{/if}
				<input
					type="text"
					placeholder="Type a message..."
					minlength="1"
					bind:value={newMessage}
					class="input input-bordered input-primary flex-grow"
				/>
				<button type="submit" class="btn btn-primary m-2">send</button>
			</form>
		</div>
	</div>
</div>