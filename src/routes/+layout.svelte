<script lang="ts">
  import "../app.css";
  export let currentPath: any;
</script>

<nav class="flex justify-between items-center p-4 bg-gray-200">
  <a href="/" class:selected={currentPath === "/"} class="mr-4 text-gray-700 hover:underline">Home</a>
  <a href="/manga" class:selected={currentPath === "/manga"} class="mr-4 text-gray-700 hover:underline">Manga</a>
  <a href="/about" class:selected={currentPath === "/about"} class="text-gray-700 hover:underline">About</a>
</nav>

<slot></slot>
