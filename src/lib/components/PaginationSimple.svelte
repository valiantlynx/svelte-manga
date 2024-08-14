<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import toast from 'svelte-french-toast';
    import { ButtonWithIcon } from '@valiantlynx/svelte-ui';
	import { onMount } from 'svelte';

    export let action = "?/popular";
    export let disabled = !$page.data.popularMangas;
    let loading;

    $: loading = false;

    // Function to set the selected server to local storage
    const setSelectedServerToLocalStorage = (server) => {
        localStorage.setItem('selectedServer', server);
    };

    // Retrieve the selected server from local storage
    let selectedServer;
    onMount(()=>{
        selectedServer = localStorage.getItem('selectedServer') || '';
    })
    
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
        { name: "MANGANELO", active: true },
        { name: "MANGACLASH", active: true },
        { name: "MANGAKISS", active: false },
        { name: "KISSMANGA", active: false },
        { name: "MANHUATOP", active: false },
        { name: "MANGAPARK_IO", active: false },
        { name: "MANGAPARK_NET", active: false },
        { name: "MANHUAFAST", active: false },
        { name: "RMANGA", active: false },
        { name: "READMANGA", active: false }
    ];
    
    const submitFormWithServer = async () => {
        const server = servers.find(s => s.name === selectedServer && s.active);
        if (server) {
            loading = true;
            const formData = new FormData();
            formData.append('server', server.name);
            formData.append('page', pageNo.toString());

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    toast.success('Data loaded successfully');
                } else {
                    toast.error('Failed to load data');
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                loading = false;
            }
        } else {
            toast.error('Selected server is not active');
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
        <div class="flex flex-row justify-start">
            <select 
                class="btn btn-primary border-secondary"
                bind:value={selectedServer}
                on:change={() => {
                    submitFormWithServer();
                    setSelectedServerToLocalStorage(selectedServer);
                }}
                name="server">
                {#each servers as { name, active }}
                    <option 
                        value={name} 
                        disabled={!active}
                        class="{active ? '' : 'select-disabled cursor-not-allowed'}"
                    >
                        {name}
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
