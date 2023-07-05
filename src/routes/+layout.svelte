<script lang="ts">
  import "../app.css";
  import Search from "../components/Search.svelte";
  export let currentPath: any;
</script>

<nav class="flex flex-wrap justify-between items-center p-4 bg-gray-200">

  <a href="/" class:selected={currentPath === "/"} class="mr-4 mb-2 text-gray-700 hover:underline">Home</a>
  <a href="/manga" class:selected={currentPath === "/manga"} class="mr-4 mb-2 text-gray-700 hover:underline">Manga</a>
  <a href="/about" class:selected={currentPath === "/about"} class="mr-4 mb-2 text-gray-700 hover:underline">About</a>
  <div class="flex items-center">
    <Search />
  </div>
</nav>

<slot></slot>
