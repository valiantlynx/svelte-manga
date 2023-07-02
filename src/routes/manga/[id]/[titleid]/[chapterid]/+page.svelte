<!-- chapter.svelte -->
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

  <div class="chapter-container">
    {#each images as image}
      <div class="image-item">
        <img src={image.imageUrl} alt={`Page ${image.pageNumber}`} />
      </div>
    {/each}
  </div>
</main>

<style>
  main {
    padding: 2rem;
    background-color: #f7f7f7;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .chapter-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .image-item {
    max-width: 80%;
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .image-item {
      max-width: 100%;
    }
  }
</style>
