<!-- manga.svelte -->
<script>
  import { onMount } from 'svelte';

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

  <div class="manga-grid">
    {#each mangas as manga}
      <button
        class="manga-item"
        on:click={() => goToMangaChapters(manga.id, manga.titleId)}
        on:keypress={() => goToMangaChapters(manga.id, manga.titleId)}
      >
        <img src={manga.img} alt={manga.title} />
        <h2>{manga.title}</h2>
        <p>{manga.description}</p>
      </button>
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

  .manga-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .manga-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease;
    border: none;
    outline: none;
  }

  .manga-item:hover {
    transform: translateY(-5px);
  }

  .manga-item img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #888888;
  }
</style>
