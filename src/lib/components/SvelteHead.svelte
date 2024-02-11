<script>
    import { page } from '$app/stores';
    export let title = $page.data.siteName
    export let url = $page.url.origin
    export let type = "website"
    export let image = "/twitter-image.png"
    export let keywords = "manga, read manga, read manga online, request manga, manga reading website, populate manga, manga online, manga, manga details, manga chapters, read manga free, manga free, read free manga, read free manga online, manga reader, manga viewer, manga scans" + $page.data.siteName + $page.url.origin;
    export let description = 'Read the latest manga online for free at AnimeVariant, update fastest, most full, synthesized 24h free with high-quality images and be the first one to publish new chapters.';
    export let author = $page.data.siteName
    export let image_alt = $page.data.siteName + " Logo"

    // for facebook
    export let siteName = $page.data.siteName
    export let app_id = siteName
    export let admins = siteName
    export let page_id = siteName;

    // for twitter
    export let card = "/twitter-image.png";

    // for article
    export let publisher = $page.data.siteName
    export let section = $page.data.siteName
    export let tags = [siteName, "manga", "read manga", "read manga online", "request manga", "manga reading website", "populate manga", "manga online", "manga", "manga details", "manga chapters", "read manga free", "manga free", "read free manga", "read free manga online", "manga reader", "manga viewer", "manga scans"]
    
    //get the current date
    const date = new Date();
    export let published_time = date.toISOString();
    export let modified_time = date.toISOString();
    export let first_name = $page.data.siteName;
    export let last_name = $page.data.siteName;
    export let username = author;


</script>


<svelte:head>
	<title> {title}</title>
	<!-- Open Graph Meta Tags (for social media sharing) -->
	<meta property="og:title" content={title} />
	<meta
		property="og:description"
		content={description}
	/>
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:alt" content={image_alt} />
	<meta property="og:site_name" content={title} />

	<!-- Twitter Meta Tags (for social media sharing) -->
	<meta name="twitter:card" content={card} />
	<meta name="twitter:title" content={title} />
	<meta
		name="twitter:description"
		content={description}
	/>
	<meta name="twitter:image" content={image} />

	<!-- Facebook Meta Tags (for social media sharing) -->
	<meta property="fb:app_id" content={app_id} />
	<meta property="fb:admins" content={admins} />
	<meta property="fb:page_id" content={page_id} />
	<meta property="fb:site_name" content={siteName} />

	<meta property="article:publisher" content={publisher} />
	<meta property="article:author" content={author} />
	<meta property="article:section" content={section} />
    {#each tags as tag}
    <meta property="article:tag" content={tag} />
    {/each}
	<meta property="article:published_time" content={published_time} />
	<meta property="article:modified_time" content={modified_time} />
	<meta property="article:author:first_name" content={first_name} />
	<meta property="article:author:last_name" content={last_name} />
	<meta property="article:author:username" content={username} />

	<!-- Schema.org Meta Tags (for SEO) -->
	<meta itemprop="headline" content={title} />
	<meta
		itemprop="description"
		content={description}
	/>
	<meta itemprop="image" content={image} />
    <meta itemprop="name" content={title} />
	<meta
		itemprop="description"
		content={description}
	/>

	<!-- Keywords Meta Tag -->
	<meta
		name="keywords"
		content={keywords}
	/>
    <meta name="description" content={description} />
</svelte:head>
