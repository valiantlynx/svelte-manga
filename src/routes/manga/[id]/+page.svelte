<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { currentPage } from '$lib/utils/stores';
	import Pagination from '$lib/components/Pagination.svelte';
	import Chapters from '$lib/components/Chapters.svelte';
	import MangaDetails from '$lib/components/MangaDetails.svelte';

	export let data: any;

	console.log('data: ', data);

	let { id } = $page.params;
	let chaptersPerPage = 12;
	let pageNumbers: any[] = [];
	let chaptersToShow: any[] = [];

	onMount(() => {
		updateChaptersToShow();
		generatePageNumbers();
	});

	function updateChaptersToShow() {
		const startIndex = ($currentPage - 1) * chaptersPerPage;
		const endIndex = startIndex + chaptersPerPage;
		console.log('data.episodes: ', data);
		chaptersToShow = data.episodes.slice(startIndex, endIndex);
	}

	function goToPage(event?: any) {
		console.log('pageNumber: ', event.target.value, 'currentPage: ', $currentPage);

		currentPage.set(event.target.value);
		console.log('currentPage: ', $currentPage);
		updateChaptersToShow();
	}

	// Generate an array of page numbers for pagination buttons
	function generatePageNumbers() {
		const totalChapters = data.episodes.length;
		const totalPages = Math.ceil(totalChapters / chaptersPerPage);
		pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}
</script>

<main class="p-8">
	<h1 class="text-3xl font-bold mb-6 text-center">Manga Chapters</h1>
	<div class="grid grid-cols-1 gap-4 m-2 p-3 w-full h-full justify-center">
		<MangaDetails {data} />
		<Chapters {chaptersToShow} {id} />
		<Pagination {goToPage} {pageNumbers} />
	</div>
</main>
