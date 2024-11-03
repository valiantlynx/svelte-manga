<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import BigSearchResults from './BigSearchResults.svelte';
	import SmallSearchResults from './SmallSearchResults.svelte';
	import { metaKeywords, searchQuery } from '$lib/utils/stores';

	let { VITE_PUBLIC_API } = import.meta.env;
	export let type: 'small' | 'big' = 'small';

	let searchResults: any = [];
	let searchTerm = '';
	let searchType = 'manga'; // Default to 'manga', can also be 'anime'

	async function search() {
		if (searchTerm.trim() === '') {
			searchResults = [];
			return;
		}

		try {
			let response;

			// Choose API endpoint based on search type
			if (searchType === 'manga') {
				response = await axios.get(`${VITE_PUBLIC_API}/api/search`, {
					params: { word: searchTerm, page: 1 }
				});
				const { mangas } = response.data;
				searchResults = mangas;
				console.log("ma", mangas)
			} else if (searchType === 'anime') {
				response = await axios.get(`${VITE_PUBLIC_API}/api/search/${searchTerm}/1`, {
					headers: { 'Access-Control-Allow-Origin': '*' }
				});
				const { results } = response.data;
				searchResults = results
				console.log("re", results)
			}
		} catch (error) {
			console.error(error);
		}
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
		console.log(searchTerm)
		searchQuery.set(searchTerm);
	}

	// Updated handleClick function to use goto for internal navigation based on searchType
	function handleClick(id) {
		console.log(searchResults, id)
		const url = searchType === 'manga' ? id : `/anime/${id}`;
		window.location = url;
		searchTerm = '';
	}

	if ($searchQuery) {
		searchTerm = $searchQuery;
	}

	// Update meta keywords based on search results
	$: {
		if (searchResults.length > 0) {
			const keywords = searchResults.map((result: any) => result.title).join(', ');
			metaKeywords.set(keywords);
			console.log(searchResults)
		}
	}
</script>

<div class="max-w-screen mx-auto">
	<div class="join">
		<div>
			<div>
				<input
					class="input input-bordered input-primary join-item w-full"
					value={$searchQuery && type === 'big' ? $searchQuery : ''}
					placeholder="Search"
					on:input={handleSearch}
				/>
			</div>
		</div>

		<!-- Dropdown to select between Manga and Anime -->
		<select class="select select-bordered select-primary join-item w-1/3" bind:value={searchType}>
			<option value="manga">Manga</option>
			<option value="anime">Anime</option>
		</select>

		<a href="/search" class="btn btn-primary join-item w-1/5">Search</a>
	</div>

	{#if type === 'small'}
		<SmallSearchResults {searchResults} {handleClick} />
	{:else if type === 'big'}
		<BigSearchResults {searchResults} {handleClick} />
	{/if}
</div>
