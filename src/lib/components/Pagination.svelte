<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';

	let loading = false;

	const submitPageNo = async () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'invalid':
					toast.error('Invalid credentials');
					await update();
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
	let pageNo: any;

</script>

<form
	action="?/chapters"
	method="POST"
	class="flex justify-center my-2"
	use:enhance={submitPageNo}
>
<div class="w-full">
	<!-- pagination -->
	<div class="join">
		<button
			type="submit"
			class="join-item btn btn-primary"
			value={pageNo - 1}
			name="page"
			on:click={() => pageNo--}
			disabled={pageNo === 1}>«</button
		>
	  <select 
	  class="btn btn-primary border-secondary"
	  bind:value={pageNo}
	  on:change={submitPageNo}
	  name="server">
	  {#each $page.data.pageNumbers as pageNumber}
		  <option value={pageNumber}>
			  {pageNumber}
		  </option>
	  {/each}
  </select>

		<button
			type="submit"
			class="join-item btn btn-primary"
			value={pageNo + 1}
			name="page"
			on:click={() => pageNo++}
			disabled={pageNo === $page.data.pageNumbers.length}>»</button
		>
	</div>
</div>
</form>
