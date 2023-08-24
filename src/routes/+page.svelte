<script>
	import Search from  '$lib/components/Search.svelte';
</script>

<main class="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
	<h1 class="text-4xl font-bold mb-8">Welcome to Animevariant</h1>

	<nav class="flex flex-col gap-4 mb-8">
		<a
			href={'/about'}
			class="px-4 py-2 bg-orange-500 text-white font-bold rounded transition-colors hover:bg-orange-600"
			aria-label="Go to about page">Go to About Page</a
		>
		<a
			href={'/manga'}
			class="px-4 py-2 bg-orange-500 text-white font-bold rounded transition-colors hover:bg-orange-600"
			aria-label="Go to manga page">Go to Manga Page</a
		>
	</nav>

	<Search />
</main>

<footer class="text-center py-4 bg-gray-800 text-white">
	<p>the website works fine, I just suck at CSS</p>
</footer>
