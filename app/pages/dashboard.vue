<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ParticlesBg from '../components/imported/ParticlesBg.vue';

// Necessary Types
import type BillingInfo from '~~/lib/interfaces/billing';
import type User from '~~/lib/interfaces/user';

// Section components
import OverviewSection from '~/components/OverviewSection.vue';
import AccountSettings from '~/components/AccountSettings.vue';
import BillingSection from '~/components/BillingSection.vue';

useHead({
	title: 'Dashboard | SnapTix',
	meta: [
		{ name: 'description', content: 'Access your SnapTix dashboard to manage your account, billing, and subscription settings, and quickly fix code, text, and content.' },
	],
});

const route = useRoute();
const router = useRouter();

enum Section {
	overview = 'overview',
	settings = 'settings',
	billing = 'billing',
}

function isSection(value: any): value is Section {
	return Object.values(Section).includes(value);
}

if (!route.query.section) {
	router.replace({ query: { section: 'overview' } });
}

const activeSection = computed<Section>({
	get: () => (isSection(route.query.section) ? route.query.section : Section.overview),
	set: val => router.replace({ query: { section: val } }),
});
const currentSection = computed(() => sections[activeSection.value]);

const navItems = [
	{ key: Section.overview, label: 'Overview', icon: 'bx:user' },
	{ key: Section.settings, label: 'Account Settings', icon: 'mingcute:settings-3-fill' },
	{ key: Section.billing, label: 'Billing', icon: 'mingcute:bank-card-fill' },
];

const sections = {
	overview: OverviewSection,
	settings: AccountSettings,
	billing: BillingSection,
};

const { data: userDetails, refresh } = await useAsyncData<User>(
	'userDetails',
	() => $fetch('/api/account/info', {
		headers: useRequestHeaders(['cookie']),
	}),
);

const { data: billingDetails } = await useAsyncData<BillingInfo>(
	'billingDetails',
	() => $fetch('/api/stripe/billing/overview', {
		headers: useRequestHeaders(['cookie']),
	}),
);

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

		<div class="flex">
			<!-- Sidebar -->
			<aside class="flex flex-col w-64 p-5 min-h-[70vh] overflow-y-auto">
				<h1 class="text-2xl font-bold mb-10">
					Dashboard
				</h1>

				<nav class="flex flex-col gap-4">
					<button
						v-for="item in navItems"
						:key="item.key"
						:class="[
							'flex items-center gap-2 px-4 py-2 rounded-xl transition-all focus:outline-none',
							activeSection === item.key
								? 'bg-[#00E1FF]/30'
								: 'hover:bg-white/10 hover:cursor-pointer',
						]"
						@click="activeSection = item.key"
					>
						<Icon
							:name="item.icon"
							class="text-[#00E1FF]"
						/>
						<span class="text-[#F1F1F1]">{{ item.label }}</span>
					</button>
				</nav>
			</aside>

			<!-- Main Content -->
			<main class="flex-1 p-5 md:p-10">
				<Transition
					name="section-fade"
					mode="out-in"
				>
					<component
						:is="currentSection"
						:user="userDetails"
						:billing="billingDetails"
						class="w-full"
						@refresh-user="refresh"
					/>
				</Transition>
			</main>
		</div>

		<FooterComponent />
	</div>
</template>

<style scoped>
aside {
	border-right: 2px solid transparent;
	border-image: linear-gradient(to right, #00E1FF, #736EFE);
	border-image-slice: 1;
	background: rgba(255, 255, 255, 0.06);
	backdrop-filter: blur(3px);
	box-shadow: 0 0 25px rgba(0, 225, 255, 0.1);
	color: #f1f1f1;
}

h1 {
	background: linear-gradient(to right, #00E1FF, #736EFE);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	display: inline-block;
	letter-spacing: 1px;
	text-shadow: 0 0 10px rgba(0, 225, 255, 0.4);
}

.section-fade-enter-active,
.section-fade-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    filter 0.25s ease;
	transition-delay: 80ms;
  will-change: opacity, transform, filter;
}

.section-fade-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.985);
  filter: blur(4px);
}

.section-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.99);
  filter: blur(2px);
}

@media (prefers-reduced-motion: reduce) {
  .section-fade-enter-active,
  .section-fade-leave-active {
    transition: none !important;
  }
}
</style>
