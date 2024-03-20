<script>
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';

    $: data = $page.data.manga;
    $: currentChapterIndex = $page.data.currentChapterIndex;
    $: chapters = data?.manga?.chapters || [];

    // Update based on the reactive $page.params
    $: $page.params.chapterid, updateCurrentChapterIndex();

    function updateCurrentChapterIndex() {
        currentChapterIndex = chapters.findIndex(chapter => chapter.chapterId === $page.params.chapterid);
    }

    function navigateChapter(offset) {
        const newIndex = currentChapterIndex + offset;
        if (newIndex >= 0 && newIndex < chapters.length) {
            const newChapterId = chapters[newIndex].chapterId;
            goto(`/manga/${$page.params.id}/${newChapterId}`);
        }
    }


    export let readingMode;

    const readingModeSelect = ['longstrip', 'grid', 'paginated'];



    let servers = [
		"MANGANELO",
		// "CHAPMANGANELO",
		// "MANGACLASH"
	];
    let selectedServer;
    const submitFormWithServer = async (server) => {
        loading = true;

        // Construct form data
        const formData = new FormData();
        formData.append('server', server);

        try {
            const response = await fetch(action, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                // Handle successful response
                // Update your component state/data as necessary
                toast.success('Data loaded successfully');
            } else {
                // Handle server errors or invalid responses
                toast.error('Failed to load data');
            }
        } catch (error) {
            // Handle network errors
            toast.error(error.message);
        } finally {
            loading = false;
        }
    };
</script>

<div class="flex flex-wrap">
    <div class="left-content order-1 ml-auto md:order-2">
        <!-- Next and Previous Chapter Buttons -->
        <div class="space-x-4 m-4">
            {#if currentChapterIndex < data.manga.chapters.length - 1}
            <button class="px-4 py-2 rounded-lg btn btn-primary" on:click={() => navigateChapter(1)}>
                Previous Chapter
            </button>
            {/if}

            {#if currentChapterIndex !== 0}
            <button class="px-4 py-2 rounded-lg btn btn-primary" on:click={() => navigateChapter(-1)}>
                Next Chapter
            </button>
            {:else}
            <button class="px-4 py-2 rounded-lg btn btn-secondary" on:click={() => goto(`/manga/${$page.params.id}`)}>
                Manga Details
            </button>
            {/if}
        </div>
    </div>

    <div class="right-content order-2 md:order-1">
            <!-- Reading Mode Selection -->
            <select class="select select-primary m-4" bind:value={readingMode}>
                <option disabled selected>Select reading mode?(longstrip)</option>
                {#each readingModeSelect as mode}
                <option value={mode}>{mode}</option>
                {/each}
            </select>
  
            <select 
            class="btn btn-primary border-secondary"
            bind:value={$page.params.chapterid}
			on:change={() => goto(`/manga/${$page.params.id}/${$page.params.chapterid}`,{
                replaceState: true,
                invalidateAll: true
            })}
            name="chapters">
            {#each data.manga.chapters as chapter}
                <option value={chapter.chapterId}>
                    {chapter.chapterId}
                </option>
            {/each}
        </select>

            <select 
            class="btn btn-primary border-secondary"
            bind:value={selectedServer}
			on:change={submitFormWithServer}
            name="servers">
            {#each servers as server}
                <option value={server}>
                    {server}
                </option>
            {/each}
        </select>
    </div>
</div>
