<script lang=ts>
  import type { PageData } from "./$types";
  import { page } from '$app/stores';

  export let data: PageData;  

  let { id } = $page.params;
</script>

<main>
  <h1>Manga Chapters</h1>

  <div class="chapter-grid">
    {#each data.chapters as chapter}
      <div class="chapter-item">
        <h2>{chapter.chapterTitle}</h2>
        <a href={`/manga/${id}/${chapter.chapterId}`}>Read Chapter</a>
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

  .chapter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .chapter-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease;
  }

  .chapter-item:hover {
    transform: translateY(-5px);
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #2196f3;
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  a:hover {
    background-color: #1976d2;
  }
</style>
