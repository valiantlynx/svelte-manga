<script>
	import { site } from '@valiantlynx/general-config';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	const logo = $page.data.sites?.logo
                ? `${site.site.pocketbase}/api/files/${$page.data.sites?.collectionId}/${$page.data.sites?.id}/${$page.data.sites?.logo}`
                : `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${$page.data.sites?.siteName}`;
</script>

<footer class="footer footer-center p-10 bg-base-300 text-base-content rounded mt-auto">
	<a href="/" class="p-1">
		{#if !$page.url.isSmallDevice}
				<img src={logo} alt="{$page.data.siteName} logo"  class="w-80" />
		{/if}
</a>
	<div class="grid grid-flow-col gap-4">
		<a href="/about" class="link link-hover">About us</a>
		<a href="/contact" class="link link-hover">Contact</a>
		<a href="/privacy-policy" class="link link-hover">Privacy</a>
		<a href="/sitemap.xml" class="link link-hover">Sitemap</a>
	</div>
	<div>
		<div class="grid grid-flow-col gap-4">
			<a href="https://www.facebook.com/animevariant/" class="link link-hover hover:link-primary"
				><Icon icon="mdi:twitter" /></a
			>
			<a href="https://www.youtube.com/@valiantlynx/" class="link link-hover hover:link-primary"
				><Icon icon="mdi:youtube" /></a
			>
			<a href="https://www.facebook.com/animevariant/" class="link link-hover hover:link-primary"
				><Icon icon="mdi:facebook" /></a
			>
		</div>
	</div>
	<div>
		<p>Copyright © {new Date().getFullYear()} - All right reserved by {$page.data.siteName}</p>
	</div>
</footer>
