<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { writable } from "svelte/store";

  import type { PageData } from "./$types";

  export let data: PageData;

  let { id } = $page.params;
  let currentPage = 1;
  let chaptersPerPage = 12; // Adjust the number of chapters per page as needed
  const chaptersCount = writable(data.chapters.length);
  let chaptersToShow: any[] = [];

  onMount(() => {
    updateChaptersToShow();
  });

  function updateChaptersToShow() {
    const startIndex = (currentPage - 1) * chaptersPerPage;
    const endIndex = startIndex + chaptersPerPage;
    chaptersToShow = data.chapters.slice(startIndex, endIndex);
    window.localStorage.setItem("chaptersToShow", JSON.stringify(chaptersToShow));
  }

  function goToPage(pageNumber: number) {
    currentPage = pageNumber;
    updateChaptersToShow();
  }
</script>

<main class="p-8">
  <h1 class="text-3xl font-bold mb-6 text-center">Manga Chapters</h1>

  <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {#each chaptersToShow as chapter}
      <div class="p-4 border rounded-lg shadow-md transition-transform hover:-translate-y-1">
        <h2 class="text-xl font-bold mb-2">{chapter.chapterTitle}</h2>
        <a href={`/manga/${id}/${chapter.chapterId}`} class="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300">Read Chapter</a>
      </div>
    {/each}
  </div>

  <!-- pagination -->
  <div class="mt-8 flex justify-center">
    {#if $chaptersCount > chaptersPerPage}
      <nav>
        <ul class="flex flex-wrap space-x-2">
          {#each Array.from({ length: Math.ceil($chaptersCount / chaptersPerPage) }) as _, index}
            <li>
              <button
                class="px-3 py-1 rounded-lg bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                class:selected={currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}
                on:click={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          {/each}
        </ul>
      </nav>
    {/if}
  </div>
</main>

<style>
  main {
    background-color: #f7f7f7;
  }
</style>
