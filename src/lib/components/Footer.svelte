<script>
	import { site } from '@valiantlynx/general-config';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	const logo = $page.data.sites?.logo
                ? `${site.site.pocketbase}/api/files/${$page.data.sites?.collectionId}/${$page.data.sites?.id}/${$page.data.sites?.logo}`
                : `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${$page.data.sites?.siteName}`;
    // Dynamically set or change links based on conditions
    const links = [
        { href: "/about", text: "About us" },
        { href: "/contact", text: "Contact" },
        { href: "/dmca-notice", text: "DCMA" },
        { href: "/privacy-policy", text: "Privacy" },
        { href: "/terms-of-service", text: "Terms of Service" }, // Fixed typo "og" to "of"
        { href: "/sitemap.xml", text: "Sitemap" }
    ];
</script>


<style>
    @media (max-width: 768px) {
        .responsive-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (min-width: 769px) {
        .responsive-grid {
            grid-template-columns: repeat(6, minmax(0, 1fr));
        }
    }
</style>

<div class="footer footer-center p-10 bg-base-300 text-base-content rounded mt-auto">
	<a href="/" class="p-1">
		{#if !$page.url.isSmallDevice}
				<img src={logo} alt="{$page.data.siteName} logo"  class="w-80" />
		{/if}
</a>
<div class="grid responsive-grid gap-4">
    {#each links as link}
        <a href={link.href} class="link link-hover">{link.text}</a>
    {/each}
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
</div>
