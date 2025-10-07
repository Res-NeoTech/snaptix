<script setup lang="ts">
import { ref, computed } from 'vue';
import ParticlesBg from '../components/imported/ParticlesBg.vue';

// Section components
import OverviewSection from '~/components/OverviewSection.vue';
import AccountSettings from '~/components/AccountSettings.vue';
import PaymentSection from '~/components/PaymentSection.vue';

interface User {
  id: string
  username: string
  email: string
  joinDate: string
  isPremium: boolean
}


enum Section {
	overview = 'overview',
	settings = 'settings',
	payments = 'payments',
}

const activeSection = ref<Section>(Section.overview);
const nbParticles = ref<number>(0);

const navItems = [
	{ key: Section.overview, label: 'Overview', icon: 'bx:user' },
	{ key: Section.settings, label: 'Account Settings', icon: 'mdi:cog' },
	{ key: Section.payments, label: 'Payments', icon: 'mdi:credit-card-outline' },
];

const sections = {
	overview: OverviewSection,
	settings: AccountSettings,
	payments: PaymentSection,
};

const { data: userDetails } = await useAsyncData<User>(
  'userDetails',
  () => $fetch('/api/account/info'),
  { server: true, lazy: false }
)

const currentSection = computed(() => sections[activeSection.value]);
onMounted(() => nbParticles.value = Math.round(200 + Math.random() * 50));
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
		<!-- Sidebar Navigation -->
		<div class="flex">
			<aside class="flex flex-col w-64 p-5 min-h-[70vh] overflow-y-auto">
				<h1
					class="text-2xl font-bold mb-10"
				>
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
			<main
				v-auto-animate
				class="flex-1 p-5 md:p-10"
			>
				<component
					v-if="userDetails"
					:is="currentSection"
					:key="activeSection"
                    :user="userDetails"
					class="w-full"
				/>
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
</style>
