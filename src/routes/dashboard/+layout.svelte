<script>
	import Login from '$lib/components/Login.svelte';
	import { pb } from '$lib/utils/api';
	import { authData } from '$lib/utils/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		pb.authStore.isValid ? authData.set(pb.authStore.model) : null;
	});
</script>

{#if pb.authStore.isValid}
		<slot />
{:else}
	<Login />
{/if}
