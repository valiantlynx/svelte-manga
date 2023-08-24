<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>AnimeVariant</title>
	<meta
		name="description"
		content="Read the latest manga online for free at animevariant.org, update fastest, most full, synthesized 24h free with high-quality images and be the first one to publish new chapters."
	/>

	<!-- Robots Meta Tag -->
	<meta name="robots" content="index, follow" />

	<!-- Canonical Link -->
	<link rel="canonical" href="https://animevariant.com/" />

	<!-- Author Meta Tag -->
	<meta name="author" content="Valiantlynx" />

	<!-- Keywords Meta Tag -->
	<meta
		name="keywords"
		content="manga, read manga, read manga online, request manga, manga reading website, populate manga, manga online, manga, manga details, manga chapters, read manga free, manga free, read free manga, read free manga online, manga reader, manga viewer, manga scans, animevariant, AnimeVariant.org "
	/>

	<!-- Open Graph Meta Tags (for social media sharing) -->
	<meta property="og:title" content="AnimeVariant" />
	<meta
		property="og:description"
		content="Read the latest manga online for free at animevariant.org, update fastest, most full, synthesized 24h free with high-quality images and be the first one to publish new chapters."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://animevariant.com/" />
	<meta property="og:image" content="/twitter-image.png" />
	<meta property="og:image:alt" content="AnimeVariant Logo" />
	<meta property="og:site_name" content="AnimeVariant" />

	<!-- Twitter Meta Tags (for social media sharing) -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="AnimeVariant" />
	<meta
		name="twitter:description"
		content="Read the latest manga online for free at animevariant.org, update fastest, most full, synthesized 24h free with high-quality images and be the first one to publish new chapters."
	/>
	<meta name="twitter:image" content="/twitter-image.png" />

	<!-- Google / Search Engine Tags -->
	<meta itemprop="name" content="AnimeVariant" />
	<meta
		itemprop="description"
		content="Read the latest manga online for free at animevariant.org, update fastest, most full, synthesized 24h free with high-quality images and be the first one to publish new chapters."
	/>
	<meta itemprop="image" content="/twitter-image.png" />

	<!-- Facebook Meta Tags (for social media sharing) -->
	<meta property="fb:app_id" content="AnimeVariant" />
	<meta property="fb:admins" content="AnimeVariant" />
	<meta property="fb:page_id" content="AnimeVariant" />
	<meta property="fb:site_name" content="AnimeVariant" />
	<meta property="article:publisher" content="AnimeVariant" />
	<meta property="article:author" content="AnimeVariant" />
	<meta property="article:section" content="AnimeVariant" />
	<meta property="article:tag" content="AnimeVariant" />
	<meta property="article:published_time" content="AnimeVariant" />
	<meta property="article:modified_time" content="AnimeVariant" />
	<meta property="article:expiration_time" content="AnimeVariant" />
	<meta property="article:author:first_name" content="AnimeVariant" />
	<meta property="article:author:last_name" content="AnimeVariant" />
	<meta property="article:author:username" content="AnimeVariant" />

	<!-- Schema.org Meta Tags (for SEO) -->
	<meta itemprop="headline" content="AnimeVariant" />
	<meta
		itemprop="description"
		content="Read the latest manga online for free at animevariant.org, update fastest, most full, synthesized 24h free with high-quality images and be the first one to publish new chapters."
	/>
	<meta itemprop="image" content="/twitter-image.png" />
</svelte:head>


<Nav />
<slot />
