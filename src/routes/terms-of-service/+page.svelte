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
        <h3 class="text-4xl font-bold text-secondary">Terms of Usage</h3>
        <p>Your Acceptance</p>
        <p>By using and/or visiting this website (collectively, including all Content available through the {$page.data.siteName} domain name, the "{$page.data.siteName} Website", or "Website"), You comply and assent to the Terms of Usage/Terms of Use/Terms of Service, which are published at [your terms of service link] and which are incorporated herein by reference. If you do not agree to any of these terms, then please do not use the {$page.data.siteName} Website.</p>
        
        <p>These Terms of Use apply to all users of the {$page.data.siteName} Website, including users who are also contributors of content, information, and other materials or services on the Website. The {$page.data.siteName} Website may contain links to third-party websites that are not owned or controlled by {$page.data.siteName}. {$page.data.siteName} has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites. In addition, {$page.data.siteName} will not and cannot censor or edit the content of any third-party site. By using the Website, you expressly relieve {$page.data.siteName} from any and all liability arising from your use of any third-party website. Accordingly, we encourage you to be aware when you leave the {$page.data.siteName} Website and to read the terms and conditions and privacy policy of each other website you visit.</p>
        
        <p>Website Access</p>
        <p>{$page.data.siteName} hereby grants you permission to use the Website as set forth in this Terms of Use, provided that: (i) your use of the Website as permitted is solely for your personal, noncommercial use; (ii) you will not copy or distribute any part of the Website in any medium without {$page.data.siteName}'s prior written authorization; (iii) you will not alter or modify any part of the Website other than as may be reasonably necessary to use the Website for its intended purpose; and (iv) you will otherwise comply with the terms and conditions of these Terms of Use.</p>
        
        <p>Intellectual Property Rights</p>
        <p>The content on the {$page.data.siteName} Website, except all User Submissions (as defined below), including without limitation, the text, software, scripts, graphics, photos, sounds, music, videos, interactive features, and the like ("Content") and the trademarks, service marks, and logos contained therein ("Marks"), are owned by or licensed to {$page.data.siteName}, subject to copyright and other intellectual property rights under the United States and foreign laws and international conventions. Content on the Website is provided to you AS-IS for your information and personal use only and may not be used, copied, reproduced, distributed, transmitted, broadcast, displayed, sold, licensed, or otherwise exploited for any other purposes whatsoever without the prior written consent of the respective owners. {$page.data.siteName} reserves all rights not expressly granted in and to the Website and the Content.</p>
        
        <p>Limitation of Liability</p>
        <p>IN NO EVENT SHALL {$page.data.siteName}, ITS OFFICERS, DIRECTORS,
            EMPLOYEES, OR AGENTS, BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER RESULTING FROM ANY (I) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT, (II) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF OUR WEBSITE, (III) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (IV) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM OUR WEBSITE, (V) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE, WHICH MAY BE TRANSMITTED TO OR THROUGH OUR WEBSITE BY ANY THIRD PARTY, AND/OR (VI) ANY ERRORS OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF YOUR USE OF ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE {$page.data.siteName} WEBSITE, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT THE COMPANY IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY TO THE FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE JURISDICTION.</p>

            <p>Indemnity</p>
            <p>You agree to defend, indemnify, and hold harmless {$page.data.siteName}, its parent corporation, officers, directors, employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from: (i) your use of and access to the {$page.data.siteName} Website; (ii) your violation of any term of these Terms of Use; (iii) your violation of any third-party right, including without limitation any copyright, privacy, or property right; or (iv) any claim that one of your User Submissions caused damage to a third party. This defense and indemnification obligation will survive these Terms of Service and your use of the {$page.data.siteName} Website.</p>
    
            <p>Ability to Accept Terms of Use</p>
            <p>You affirm that you are either more than 18 years of age, or an emancipated minor, or possess legal parental or guardian consent, and are fully able and competent to enter into the terms, conditions, obligations, affirmations, representations, and warranties set forth in these Terms of Service, and to abide by and comply with these Terms of Service. In any case, you affirm that you are over the age of 13, as the {$page.data.siteName} Website is not intended for children under 13. If you are under 13 years of age, then please do not use the {$page.data.siteName} Website.</p>
    
            <p>Assignment</p>
            <p>These Terms of Usage, and any rights and licenses granted hereunder, may not be transferred or assigned by you, but may be assigned by {$page.data.siteName} without restriction.</p>
    
            <!-- Ensure any additional sections or information specific to your website or service are added here. -->
    
        </div>
    
        <div class="grid grid-flow-col gap-4">
            <button class="btn btn-primary">Contact Us</button>
        </div>
    </div>
    