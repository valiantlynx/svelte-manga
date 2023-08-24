<script>
	import Search from "./Search.svelte";
    import { page } from "$app/stores";

</script>

<nav class="flex flex-wrap justify-between items-center p-4 bg-gray-200">
	<a href="/" class:selected={$page.params.slug === '/'} class="mr-4 mb-2 text-gray-700 hover:underline"
		>Home</a
	>
	<a
		href="/manga"
		class:selected={$page.params.slug === '/manga'}
		class="mr-4 mb-2 text-gray-700 hover:underline">Manga</a
	>
	<a
		href="/about"
		class:selected={$page.params.slug === '/about'}
		class="mr-4 mb-2 text-gray-700 hover:underline">About</a
	>
	<div class="flex items-center">
		<Search />
	</div>
</nav>