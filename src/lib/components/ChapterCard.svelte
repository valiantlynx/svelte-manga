<script lang="ts">
	export let chapter: any;
	export let url: any;
</script>

<div class="p-4 border rounded-lg shadow-md transition-transform hover:-translate-y-1">
	<h2 class="text-xl font-bold mb-2">{chapter.chapterTitle}</h2>
	<a href={url} class="inline-block px-4 py-2 btn rounded-lg duration-300" target="_self">
		Read Chapter
	</a>
</div>
