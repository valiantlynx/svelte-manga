<script>
	import Search from './Search.svelte';
	import ProfileModal from './ProfileModal.svelte';
	import { page } from '$app/stores';
	import ThemeChanger from './ThemeChanger.svelte';
</script>

<div class="navbar bg-base-200">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl" href="/">AnimeVariant</a>
		<ThemeChanger />
	</div>
	<div class="flex-none gap-2">
		<!-- dont show the small search bar on the search page -->
		{#if $page.url.pathname !== '/manga/search'}
			<Search type="small" />
		{/if}

		<ProfileModal />
	</div>
</div>
