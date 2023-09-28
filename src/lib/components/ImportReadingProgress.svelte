<script lang="ts">
	import { pb, readingProgress } from '$lib/utils/api'; // Update the import for posting reading progress

	let uploaded: boolean;
	let jsonData: string | null = null; // Store the JSON data from the file

	async function updateReadingProgress() {
		if (pb.authStore.isValid) {
			if (jsonData) {
				try {
					const progressData = JSON.parse(jsonData);
					await readingProgress(progressData); // Post the reading progress (see src/lib/utils/api.ts
					uploaded = true;
				} catch (error) {
					console.error('Failed to post reading progress:', error);
					uploaded = false;
				}
			}
		}
	}

	function handleFiles(event: any) {
		const file = event.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				jsonData = e.target?.result as string;
			};
			reader.readAsText(file);
		}
	}
</script>

<svelte:head>
	<title>Import Reading Progress</title>
</svelte:head>

<div class="w-full sm:w-1/4 container my-7">
	<h2 class="text-3xl font-semibold text-center mb-8">Import Reading Progress</h2>

	<div class="form-control w-full max-w-xs justify-center ml-7">
		<label class="label" for="progress-input">
			<span class="label-text font-bold">JSON File</span>
		</label>
		<input
			type="file"
			class="file-input file-input-secondary w-full max-w-xs"
			id="progress-input"
			on:change={handleFiles}
		/>
	</div>
	<div class="mt-16 mr-7">
		<button
			class="btn btn-primary float-right"
			disabled={!jsonData || uploaded}
			on:click={updateReadingProgress}
		>
			{!uploaded ? 'Upload' : 'Sent'}
		</button>
	</div>
</div>
