<script>
    import { site } from '@valiantlynx/general-config';
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';

    // Dynamic logo URL or a fallback to a generated avatar
    const logo = $page.data.sites?.logo
        ? `${site.site.pocketbase}/api/files/${$page.data.sites?.collectionId}/${$page.data.sites?.id}/${$page.data.sites?.logo}`
        : `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${$page.data.sites?.siteName}`;

    // Animation classes for the logo
    const animationClasses = "transition-transform duration-500 ease-in-out transform hover:scale-110";
</script>

<style>
    .footer-animate {
        animation: footerEntry 1s ease-in-out forwards;
    }

    @keyframes footerEntry {
        0% {
            transform: translateY(100%);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>

<div class="footer footer-center p-10 bg-base-300 text-base-content rounded mt-auto footer-animate">

	<div class="prose lg:prose-lg mx-4 my-2 text-justify p-5 rounded-lg shadow-lg">
		<h3 class="text-4xl font-bold text-secondary">DMCA Notice</h3>
		<p>{$page.data.siteName} respects the intellectual property of others and takes the protection of copyright seriously. If you believe that your copyrighted work has been used in a way that constitutes copyright infringement and is accessible through our service, you are encouraged to notify us.</p>
		<p>To do so, please provide the following information in accordance with the Digital Millennium Copyright Act of 1998:</p>
		<ul class="list-disc pl-5">
			<li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
			<li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a site are covered by a single notification, a representative list of such works.</li>
			<li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit the service provider to locate the material.</li>
			<li>Information reasonably sufficient to permit the service provider to contact the complaining party, such as an address, telephone number, and, if available, an email address.</li>
			<li>A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
			<li>A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
		</ul>
		<p>To expedite the process, please submit your notice via email to:</p>
	</div>
	
    <div class="grid grid-flow-col gap-4">
        <button class="btn btn-primary">Contact Us</button>
    </div>
</div>
