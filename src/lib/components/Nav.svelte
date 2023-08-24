<script>
	import Search from './Search.svelte';
	import ProfileModal from './ProfileModal.svelte';
	import { page } from '$app/stores';

    console.log($page);
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl" href="/">AnimeVariant</a>
	</div>
	<div class="flex-none gap-2">
        
		<!-- dont show the small search bar on the search page -->
		{#if $page.url.pathname !== '/search'}
			<Search type="small" />
		{/if}

		<ProfileModal />
	</div>
</div>
