<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

     /**
     * @type {any}
     */
let { id, titleid, chapterid } = $page.params;

console.log("id, titleId, chapterId: ", id, titleid, chapterid);
  /**
     * @type {any[]}
     */
  let images = [];

  onMount(async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + `/api/manga/${id}/${titleid}/${chapterid}-en`);
    const data = await response.json();
    images = data.images;
  });
</script>

<main>
  <h1>Manga Chapter</h1>

  {#each images as image}
    <div class="image-item">
      <img src={image.imageUrl} alt={`Page ${image.pageNumber}`} />
    </div>
  {/each}
</main>

<style>
  .image-item {
    margin-bottom: 2rem;
  }
</style>
