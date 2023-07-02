<script>
  import { onMount } from 'svelte';

  // Importing the dotenv package is not necessary in SvelteKit

  /**
   * @type {any[]}
   */
  let mangas = [];

  onMount(async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/browse/1');
    const data = await response.json();
    mangas = data.mangas;
  });

  // send the user to the manga chapters page
  /**
   * @param {any} id
   * @param {any} titleId
   */
  function goToMangaChapters(id, titleId) {
    console.log(id, titleId);
    window.location.href = `/manga/${id}/${titleId}`;
  }

</script>

<main>
  <h1>Manga List</h1>
  {#each mangas as manga}
    <button
      class="manga-item"
      on:click={() => goToMangaChapters(manga.id, manga.titleId)}
      on:keypress={() => goToMangaChapters(manga.id, manga.titleId)}
      tabindex="0"
    >
      <h2>{manga.title}</h2>
      <img src={manga.img} alt={manga.title} />
      <p>{manga.description}</p>
    </button>
  {/each}
</main>

<style>
  .manga-item {
    margin-bottom: 2rem;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
  }

  h2 {
    margin-top: 0;
  }
</style>
