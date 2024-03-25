<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import { ButtonWithIcon } from '@valiantlynx/svelte-ui';
	export let action = "?/popular";
	export let disabled = !$page.data.popularMangas;
	let loading;

	$: loading = false;

	const submitPageNo = () => {
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
	let pageNo = 1;
	let servers = [
		"MANGANELO",
		// "CHAPMANGANELO",
		// "MANGACLASH"
	];
	let selectedServer;
	const submitFormWithServer = async (server) => {
        loading = true;

        // Construct form data
        const formData = new FormData();
        formData.append('server', server);
        formData.append('page', pageNo.toString());

        try {
            const response = await fetch(action, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                // Handle successful response
                // Update your component state/data as necessary
                toast.success('Data loaded successfully');
            } else {
                // Handle server errors or invalid responses
                toast.error('Failed to load data');
            }
        } catch (error) {
            // Handle network errors
            toast.error(error.message);
        } finally {
            loading = false;
        }
    };

</script>

<form
    action={action}
    method="POST"
    class="flex flex-col md:flex-row justify-between items-center my-2 space-y-2 md:space-y-0 w-full"
    use:enhance={submitPageNo}
>

        {#if loading}
        <ButtonWithIcon>
            <span slot="icon" class="loading loading-spinner"></span>
            Loading ...
        </ButtonWithIcon>
        
        {:else}
		<div class="flex flex-row  justify-start">
        <select 
            class="btn btn-primary border-secondary"
            bind:value={selectedServer}
			on:change={submitFormWithServer}
            name="server">
            {#each servers as server}
                <option value={server}>
                    {server}
                </option>
            {/each}
        </select>
	</div>


	<div class="flex flex-row justify-end space-x-2">
        <button
            type="submit"
            class="btn btn-primary border-secondary"
            on:click={() => pageNo--}
            disabled={pageNo === 1}
            value={pageNo}
            name="page"
        >
            Previous - {pageNo - 1}
        </button>

        <button
            type="submit"
            class="btn btn-primary border-secondary"
            on:click={() => pageNo++}
            disabled={disabled}
            value={pageNo}
            name="page"
        >
            Next - {pageNo + 1}
        </button>
    </div>
        {/if}
  
    

</form>

