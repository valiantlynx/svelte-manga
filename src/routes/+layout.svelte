<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>AnimeVariant</title>

	<!-- Robots Meta Tag -->
	<meta name="robots" content="index, follow" />

	<!-- Canonical Link -->
	<link rel="canonical" href="https://animevariant.com/" />

	<!-- Author Meta Tag -->
	<meta name="author" content="Valiantlynx" />
</svelte:head>

<Nav />
<slot />
<Footer />
