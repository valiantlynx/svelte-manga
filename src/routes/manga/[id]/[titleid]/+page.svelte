<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

 
    /**
     * @type {any}
     */
let { id, titleid } = $page.params;

console.log("id, titleId: ", id, titleid);
  
    /**
     * @type {any[]}
     */
    let chapters = [];
  
    onMount(async () => {
      const response = await fetch(import.meta.env.VITE_API_URL + `/api/manga/${id}/${titleid}`);
      const data = await response.json();
      chapters = data.episodes;
    });
  </script>
  
  <main>
    <h1>Manga Chapters</h1>
  
    {#each chapters as chapter}
      <div class="chapter-item">
        <h2>{chapter.chapterTitle}</h2>
        <a href={`/manga/${id}/${titleid}/${chapter.chapterId}`}>Read Chapter</a>
      </div>
    {/each}
  </main>
  
  <style>
    .chapter-item {
      margin-bottom: 2rem;
    }
  
    h2 {
      margin-top: 0;
    }
  </style>
  