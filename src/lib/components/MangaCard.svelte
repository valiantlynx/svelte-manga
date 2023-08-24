<script lang="ts">
	import { onMount } from 'svelte';

	export let manga: any;
	export let goToMangaChapters: any;

	let modalVisible = false;
	let mouseX = 0;
	let mouseY = 0;
	let modalPosition = 'bottom-right'; // Default position

	function toggleModal() {
		modalVisible = !modalVisible;
	}

	function updateMousePosition(event: any) {
		mouseX = event.clientX;
		mouseY = event.clientY;

		// Determine the modal position based on mouse cursor and viewport edges
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		if (mouseX > viewportWidth / 2) {
			if (mouseY > viewportHeight / 2) {
				modalPosition = 'top-left';
			} else {
				modalPosition = 'bottom-left';
			}
		} else {
			if (mouseY > viewportHeight / 2) {
				modalPosition = 'top-right';
			} else {
				modalPosition = 'bottom-right';
			}
		}
	}

	onMount(() => {
		document.addEventListener('mousemove', updateMousePosition);
	});
</script>

<div class="w-72 bg-base-300 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
	<button
		on:click={() => goToMangaChapters(manga.id)}
		on:keypress={() => goToMangaChapters(manga.id)}
		on:mouseenter={toggleModal}
		on:mouseleave={toggleModal}
	>
		<img
			class="h-full w-full object-cover object-center group-hover:opacity-75 overflow-hidden rounded-t-xl"
			src={`${import.meta.env.VITE_IMAGE_URL}${manga.img}`}
			alt={manga.title}
		/>
		<div class="px-4 py-3 w-72">
			<span class=" mr-3 uppercase text-xs">{manga.author[0]}</span>
			<p class="text-lg font-bold truncate block capitalize">{manga.title}</p>
			<div class="flex items-center">
				<p class=" text-accent border-accent text-sm font-semibold cursor-auto">
					{manga.latestChapter}
				</p>
				<div class="ml-auto">
					<div class="rating rating-sm">
						{manga.rating}
						<input type="radio" name="rating-8" class="mask mask-star-2 bg-info" checked />
					</div>
				</div>
			</div>
		</div>
	</button>

	{#if modalVisible}
		<div
			class="absolute bg-info rounded-lg shadow-lg p-4 z-50 w-72"
			style="top: {modalPosition.includes('top')
				? mouseY - 160
				: mouseY}px; left: {modalPosition.includes('left') ? mouseX - 250 : mouseX + 20}px;"
		>
			<h2 class="text-xl font-bold mb-2">{manga.title}</h2>
			<p class="mb-4">{manga.description}</p>
			<button class="btn btn-primary">Read More</button>
		</div>
	{/if}
</div>
