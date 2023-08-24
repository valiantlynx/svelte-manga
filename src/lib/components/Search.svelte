<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import type { MouseEventHandler } from 'svelte/elements';
	import BigSearchResults from './BigSearchResults.svelte';
	import SmallSearchResults from './SmallSearchResults.svelte';
	import { searchQuery } from '$lib/utils/stores';
	import { placeOrder } from '$lib/utils/api';

	export let type: 'small' | 'big' = 'small';

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
		searchQuery.set(searchTerm);
	}

	function handleClick(url: any): MouseEventHandler<HTMLButtonElement> {
		goto(url);
		searchTerm = '';
		return () => {};
	}
	if ($searchQuery) {
		searchTerm = $searchQuery;
	}
</script>

<main class="p-2">
	<div class="max-w-screen-md mx-auto">
		<!-- Container added here -->
		<div class="join">
			<div>
				<div>
					<input
						class="input input-bordered join-item"
						placeholder= {$searchQuery ? $searchQuery : 'Search'}
						on:input={handleSearch}
					/>
				</div>
			</div>
			<select class="select select-bordered join-item">
				<option disabled selected>Manga</option>
				<option disabled class="disabled:btn-error">Anime</option>
				<option disabled class="disabled:btn-error">Chapters</option>
				<option disabled class="disabled:btn-error">News</option>
			</select>
			<div class="indicator">
				<span class="indicator-item badge badge-secondary">new</span>
				<a href="/search"  class="btn join-item">Search</a>
			</div>
		</div>

		

		{#if type === 'small'}
			<SmallSearchResults {searchResults} {handleClick} />
		{:else if type === 'big'}
			<BigSearchResults {searchResults} {handleClick} />
		{/if}
	</div>
</main>
