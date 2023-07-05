<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  
  export let data: PageData;
  let scrollPosition = 0;
  let showScrollToTop = false;

  let readingMode = "longstrip"; // Default reading mode
  let imageWidth = "full" // Default image width mode
  let currentPage = writable(0);
  let chaptersToShow: any = []


  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    chaptersToShow = JSON.parse(window.localStorage.getItem("chaptersToShow") || "[]");
  });

  function handleScroll() {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    showScrollToTop = scrollPosition > 100;
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function setReadingMode(mode: string) {
    readingMode = mode;
    currentPage.set(0); // Reset current page when switching reading modes
  }

  function setImageWidth(mode: string) {
    imageWidth = mode;
    currentPage.set(0); // Reset current page when switching reading modes
  }

  console.log($page);

  function goToPreviousChapter() {
    const currentChapterIndex = chaptersToShow.findIndex(
      (chapter: any) => chapter.chapterId === $page.params.chapterid
    );

    console.log("currentChapterIndex: " + currentChapterIndex);

    if (currentChapterIndex < chaptersToShow.length - 1) {
      const url = import.meta.env.VITE_HOST_URL + '/manga/' + $page.params.id + '/' + chaptersToShow[currentChapterIndex + 1].chapterId;
      window.location.href = url
    }
  }

  function goToNextChapter() {
    const currentChapterIndex = chaptersToShow.findIndex(
      (chapter: any) => chapter.chapterId === $page.params.chapterid
    );

    
    if (currentChapterIndex < chaptersToShow.length - 1) {
      const url = import.meta.env.VITE_HOST_URL + '/manga/' + $page.params.id + '/' + chaptersToShow[currentChapterIndex - 1].chapterId;
      window.location.href = url
    }
  }

</script>
<main >
  <h1 class="text-3xl font-bold mb-6 text-center">{$page.params.chapterid}</h1>

  <!-- Reading Mode Selection -->
  <div class="mb-4 flex justify-center space-x-4">
    <button
      class="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
      class:selected={readingMode === "longstrip"
        ? "bg-blue-500 text-white"
        : ""}
      on:click={() => setReadingMode("longstrip")}
    >
      Long Strip
    </button>

    <button
      class="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
      class:selected={readingMode === "grid" ? "bg-blue-500 text-white" : ""}
      on:click={() => setReadingMode("grid")}
    >
      Grid
    </button>
    <button
      class="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
      class:selected={readingMode === "paginated"
        ? "bg-blue-500 text-white"
        : ""}
      on:click={() => setReadingMode("paginated")}
    >
      Paginated
    </button>
  </div>

  <!-- Images width selection between full or medium -->
  <div class="mb-4 flex justify-center space-x-4">
    <button
      class="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
      class:selected={imageWidth === "full" ? "bg-blue-500 text-white" : ""}
      on:click={() => setImageWidth("full")}
    >
      Full
    </button>

    <button
      class="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
      class:selected={imageWidth === "medium" ? "bg-blue-500 text-white" : ""}
      on:click={() => setImageWidth("medium")}
    >
      Medium
    </button>
  </div>
 
  <!-- Images Display -->
  {#if readingMode === "longstrip"}
    <div class="flex flex-wrap justify-center max-w-full mx-auto">
      {#each data?.images as image}
        <div class={imageWidth == "full" ? "w-full" : "w-3/5"} >
          <img
            src={image.imageUrl}
            alt={`Page ${image.pageNumber}`}
            class="w-full rounded-lg shadow-md mb-4"
          />
        </div>
      {/each}
    </div>
  {/if}

  {#if readingMode === "grid"}
    <div class="flex flex-wrap justify-center gap-4 max-w-full mx-auto">
      {#each data?.images as image}
        <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
          <img
            src={image.imageUrl}
            alt={`Page ${image.pageNumber}`}
            class="w-full rounded-lg shadow-md"
          />
        </div>
      {/each}
    </div>
  {/if}

  {#if readingMode === "paginated"}
    <div class="flex items-center justify-center mb-4">
      <button
        class="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
        class:disabled={$currentPage === 0}
        on:click={() => ($currentPage -= 1)}
      >
        Prev
      </button>
      <h2 class="mx-4 text-lg font-bold">
        {$currentPage + 1} / {data?.images.length}
      </h2>
      <button
        class="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
        class:disabled={$currentPage === data?.images.length - 1}
        on:click={() => ($currentPage += 1)}
      >
        Next
      </button>
    </div>

    <div class="flex justify-center">
      {#each data?.images as image, index}
        {#if $currentPage === index}
          <div class="w-full max-w-4xl">
            <img
              src={image.imageUrl}
              alt={`Page ${image.pageNumber}`}
              class="w-full rounded-lg shadow-md"
            />
          </div>
        {/if}
      {/each}
    </div>
  {/if}

     <!-- Previous and Next Chapter Buttons -->
  <div class="flex justify-center space-x-4">
    <button
      class="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
      on:click={goToPreviousChapter}
    >
      Previous Chapter
    </button>
    <button
      class="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
      on:click={goToNextChapter}
    >
      Next Chapter
    </button>
  </div>


  {#if showScrollToTop}
    <button
      class="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
      on:click={scrollToTop}
    >
      Scroll to Top
    </button>
  {/if}
</main>

<style>
  main {
    background-color: #f7f7f7;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  img {
    max-width: 100%;
    height: auto;
  }
</style>
