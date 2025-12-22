<script setup lang="ts">
import { ref } from 'vue';
import ParticlesBg from '../components/imported/ParticlesBg.vue';
import ParticleImage from '~/components/imported/ParticleImage/ParticleImage.vue';

useHead({
	title: 'Terms of Use | SnapTix',
	meta: [
		{ name: 'description', content: 'Read SnapTix’s Terms of Use to understand the rules for using the app and how we ensure a safe and smooth experience while fixing code, text, and content instantly.' },
	],
});

const nbParticles = ref<number>(Math.round(200 + Math.random() * 50));
</script>

<template>
	<div class="min-h-screen bg-[#0D1117] overflow-hidden">
		<ClientOnly>
			<ParticlesBg
				class="absolute inset-0 w-full h-full pointer-events-none z-0 fixed"
				:quantity="nbParticles"
				:ease="100"
				color="00E1FF"
				:staticity="25"
				refresh
			/>
		</ClientOnly>
		<HeaderComponent />
		<div class="mt-25">
			<ParticleImage
				image-src="/fullLogo.svg"
				:responsive-width="true"
				canvas-width="960"
				canvas-height="213"
			/>
		</div>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h1 class="text-center">
				Terms of Use
			</h1>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			Last updated: January 2, 2026
		</p>
		<p>
			Welcome to <strong>SnapTix</strong> (“SnapTix”, “we”, “us”, or “our”).
			SnapTix is an AI-powered application that improves, fixes, or refines content submitted by users, including
			but not limited to code, text, and other written material.
		</p>
		<p>
			By accessing or using SnapTix (the “Service”), you agree to these Terms of Use (“Terms”). If you do not
			agree, do not use the Service.
		</p>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				Eligibility
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			You must be at least <strong>13 years old</strong> to use SnapTix. By using the Service, you confirm that
			you meet this
			requirement and that you are legally allowed to enter into these Terms.
		</p>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				Account Registration
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			To access SnapTix, you must create an account using a valid email address.
		</p>
		<p>You are responsible for:</p>
		<ul>
			<li>maintaining the confidentiality of your account</li>
			<li>all activity that occurs under your account</li>
		</ul>
		<p class="mt-5">
			We are not responsible for unauthorized access resulting from your failure to secure your
			credentials.
		</p>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				Subscriptions and Payments
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			SnapTix offers paid subscription plans.
		</p>
		<ul>
			<li>All payments are processed securely by <strong>Stripe</strong></li>
			<li>We do <strong>not</strong> store or process payment card information ourselves</li>
			<li>Subscription fees are billed according to the plan you select</li>
		</ul>
		<p class="mt-5">
			Refunds, billing issues, and payment disputes are subject to Stripe’s terms and policies.
		</p>
		<p>We reserve the right to modify pricing or subscription plans with reasonable notice.</p>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				Use of the Service
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			You agree to use SnapTix only for lawful purposes.
		</p>
		<p>You must <strong>not</strong>:</p>
		<ul>
			<li>misuse or attempt to disrupt the Service</li>
			<li>reverse engineer, scrape, or abuse the Service</li>
			<li>use SnapTix for illegal, harmful, or deceptive activities</li>
			<li>submit content that violates applicable laws or third-party rights</li>
		</ul>
		<p class="mt-5">
			We reserve the right to suspend or terminate access if these rules are violated.
		</p>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				AI-Generated Output
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			SnapTix uses artificial intelligence models provided by third-party providers (including
			<strong>Mistral</strong>) to
			generate output.
		</p>
		<p>You understand and agree that:</p>
		<ul>
			<li>AI-generated output may be <strong>inaccurate, incomplete, or incorrect</strong></li>
			<li>SnapTix does <strong>not</strong> guarantee correctness or fitness for any purpose</li>
			<li>The Service does <strong>not</strong> provide legal, medical, financial, or professional advice</li>
		</ul>
		<p class="mt-5">
			You are solely responsible for reviewing and using the output generated by the Service.
		</p>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				User Content
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			You retain ownership of any content you submit to SnapTix.
		</p>
		<p>
			By submitting content, you grant us a <strong>limited, non-exclusive license</strong> to process and use it
			solely for the purpose of providing and improving the Service.
		</p>
		<p>You are responsible for ensuring that your content does not violate any laws or third-party rights.</p>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				Intellectual Property
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			All rights, title, and interest in SnapTix — including software, branding, design, and
			underlying technology
			— belong to us or our licensors.
		</p>
		<p>
			You may not copy, modify, distribute, or exploit any part of the Service without prior written permission.
		</p>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				Availability and Changes
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			We may modify, suspend, or discontinue SnapTix (or parts of it) at any time.
		</p>
		<p>
			We may also update these Terms from time to time. Continued use of the Service after changes means you accept
			the updated Terms.
		</p>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				Disclaimer
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			SnapTix is provided <strong>“as is” and “as available”</strong>, without warranties of any
			kind.
		</p>
		<p>We do not guarantee uninterrupted availability, error-free operation, or specific results.</p>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				Limitation of Liability
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			To the maximum extent permitted by law, SnapTix shall not be liable for any indirect,
			incidental, consequential, or special damages arising from your use of the Service.
		</p>
		<p>Your use of SnapTix is at your own risk.</p>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				Termination
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			You may stop using SnapTix at any time.
		</p>
		<p>We may suspend or terminate your access if you violate these Terms or if required by law.</p>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				Governing Law
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			These Terms are governed by the laws of <strong>Switzerland</strong>, without regard to
			conflict of law
			principles.
		</p>
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				Contact
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25">
			If you have questions about these Terms, contact us at:
			<a
				href="mailto:support@snaptix.net"
				class="text-[#00E1FF] hover:text-[#736EFE]"
			>support@snaptix.net</a>
		</p>
		<FooterComponent :margin="true" />
	</div>
</template>

<style scoped>
h1,
h2 {
    background: linear-gradient(to right, #00E1FF, #736EFE);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    font-weight: 900;
    letter-spacing: 1px;
    text-shadow: 0 0 10px rgba(0, 225, 255, 0.4);
}

h1 {
    font-size: xxx-large;
}

h2 {
    font-size: xx-large;
}

h3 {
    color: #F1F1F1;
    font-weight: 700;
    font-size: x-large;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
}

p {
    color: #F1F1F1;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    font-size: large;
    margin-bottom: 25px;
}

ul>li {
    color: #F1F1F1;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    font-size: large;
    list-style-type: disc;
    margin-top: 10px;
}

strong {
    font-weight: bolder;
    text-decoration: underline;
}
</style>
