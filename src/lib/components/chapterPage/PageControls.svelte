
<script>

    import { page } from "$app/stores";
    import { goto } from '$app/navigation';

    let currentChapterIndex;

    const readingModeSelect = ['longstrip', 'grid', 'paginated'];

    let data = $page.data.manga;
    $: currentChapterIndex = $page.data.currentChapterIndex
    export let readingMode;

    // Adjusted to ensure we're not accessing an undefined index
    function navigateChapter(offset) {
        const newIndex = currentChapterIndex + offset;
        // Ensure newIndex is within the bounds of the chapters array
        if (newIndex >= 0 && newIndex < data.manga.chapters.length) {
            const newChapterId = data.manga.chapters[newIndex].chapterId;
            goto(`/manga/${$page.params.id}/${newChapterId}`);
        }
    }
</script>

<div class="flex flex-wrap">
    <div class="left-content order-1 ml-auto md:order-2">
        <!-- Previous and Next Chapter Buttons -->
        <div class="space-x-4 m-4">
            {#if currentChapterIndex === 0}
            <button class="px-4 py-2 rounded-lg btn btn-primary" on:click={() => navigateChapter(-1)}>
                Previous Chapter
            </button>
            {/if}

            {#if currentChapterIndex === 0}
            <button class="px-4 py-2 rounded-lg btn btn-secondary" on:click={() => goto(`/manga/${$page.params.id}`)}>
                Manga Details
            </button>
        {:else}
        <button class="px-4 py-2 rounded-lg btn btn-primary" on:click={() => navigateChapter(1)}>
            Next Chapter
        </button>
        {/if}
        </div>
    </div>

    <div class="right-content order-2   md:order-1">
            <!-- Reading Mode Selection -->
            <select class="select select-primary m-4" bind:value={readingMode}>
                <option disabled selected>Select reading mode?(longstrip)</option>
                {#each readingModeSelect as mode}
                <option value={mode}>{mode}</option>
                {/each}
            </select>
            <!-- Chapters Selection -->
            <select class="select select-primary my-4" bind:value={$page.params.chapterid}>
                <option disabled selected>{$page.params.chapterid}</option>
            </select>
    </div>
</div>