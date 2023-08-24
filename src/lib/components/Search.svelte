<script lang="ts">
	import axios from 'axios';

	let searchResults: any = [];
	let loading = false;
	let searchTerm = '';

	async function search() {
		if (searchTerm.trim() === '') {
			searchResults = [];
			return;
		}

		loading = true;

		try {
			const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/manga/search`, {
				params: { word: searchTerm, page: 1 }
			});

			const { mangas } = response.data;

			searchResults = mangas;
		} catch (error) {
			console.error(error);
		}

		loading = false;
	}

	let debouncedSearch: any;
	let lastSearchTerm = '';

	$: {
		if (searchTerm !== lastSearchTerm) {
			if (debouncedSearch) {
				clearTimeout(debouncedSearch);
			}

			debouncedSearch = setTimeout(search, 300);
			lastSearchTerm = searchTerm;
		}
	}

	function handleSearch(event: any) {
		searchTerm = event.target.value;
	}
</script>

<main class="p-2">
	<form>
		<div class="relative">
			<label for="searchTerm" class="sr-only">Search:</label>
			<input
				type="text"
				id="searchTerm"
				name="searchTerm"
				placeholder="Search..."
				class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				on:input={handleSearch}
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="absolute top-1/2 right-4 transform -translate-y-1/2 h-6 w-6 text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</div>
	</form>

	{#if loading}
		<div class="mt-4 flex items-center space-x-2">
			<div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900" />
			<span>Loading...</span>
		</div>
	{/if}

	<div class="search-results">
		{#if searchResults.length > 0}
			<ul class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
				{#each searchResults as result}
					<li class="bg-white shadow-md rounded-lg p-4">
						<a href={result.src} aria-label={'Go to ' + result.title + ' manga page'}>
							<h3 class="text-lg font-semibold">{result.title}</h3>
							<img src={result.img} alt={result.title} class="w-full rounded-lg mt-2" />
							<p class="text-sm text-gray-600 mt-2">Authors: {result.author}</p>
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No search results</p>
		{/if}
	</div>
</main>

<style>
	input:focus {
		border-color: #2563eb;
		box-shadow: 0 0 0 2px #2563eb;
	}

	.search-results {
		max-height: 800px;
		overflow-y: auto;
	}
</style>
