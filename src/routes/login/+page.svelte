<script>
	import Login from '$lib/components/Login.svelte';
</script>

<svelte:head>
	<title>login</title>
	<meta name="description" content="login to this app" />
</svelte:head>

<Login />
<center>
	<button class="btn btn-primary" on:click={() => window.history.back()}> Go back </button>
</center>
