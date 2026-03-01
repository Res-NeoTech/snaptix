<script setup lang="ts">
import ParticlesBg from './components/imported/ParticlesBg.vue';

const nbParticles = ref<number>(Math.round(200 + Math.random() * 51));
</script>

<template>
	<NuxtRouteAnnouncer />
	<UApp>
		<div class="min-h-screen bg-[#0D1117] overflow-x-hidden flex flex-col justify-between">
			<ClientOnly>
				<ParticlesBg
					class="inset-0 w-full h-full pointer-events-none z-0 fixed"
					:quantity="nbParticles"
					:ease="100"
					color="00E1FF"
					:staticity="25"
					refresh
				/>
			</ClientOnly>
			<HeaderComponent />
			<NuxtPage />
			<FooterComponent />
		</div>
	</UApp>
</template>
