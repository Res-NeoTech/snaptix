<script setup lang="ts">
import type { NuxtError } from '#app';
import ParticlesBg from './components/imported/ParticlesBg.vue';

const props = defineProps<{ error: NuxtError }>();
const nbParticles = ref<number>(Math.round(200 + Math.random() * 50));

useHead({
	title: `Error - ${props.error.status} | SnapTix`,
});
</script>

<template>
	<div class="min-h-screen bg-[#0D1117] overflow-hidden">
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
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h1 class="text-center">
				Error - {{ error.status }}
			</h1>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<h2 class="text-center mt-25 w-full">
			{{ error.statusText }}
		</h2>
		<p
			v-if="error.status === 404"
			class="text-center mt-25"
		>
			Looks like the content you are looking for doesn't exist.
			<br>
			Try verifying the URL or return to the homepage.
		</p>
		<p
			v-else-if="error.status as number >= 500"
			class="text-center mt-25"
		>
			Internal server error occured, something's wrong on our side.
			<br>
			Try refreshing the page or come back shortly.
		</p>
		<p
			v-else
			class="text-center mt-25"
		>
			Unexpected error occured.
			<br>
			Try refreshing the page or return to the homepage.
		</p>
		<button
			id="primaryButton"
			class="flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15 mt-25"
			@click="navigateTo('/')"
		>
			<Icon
				name="mingcute:home-3-fill"
				style="color: #F1F1F1"
				class="mr-2"
			/>
			Return to home
		</button>
		<FooterComponent />
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

p {
	color: #F1F1F1;
	width: 75%;
	margin-left: auto;
	margin-right: auto;
	font-size: large;
	margin-bottom: 25px;
}

button {
	border-radius: 18px;
	backdrop-filter: blur(8px);
	transition: all 0.3s ease;
	font-weight: 600;
	letter-spacing: 0.3px;
}

button:hover {
	cursor: pointer;
	transform: translateY(-2px);
}

/* Primary = neon liquid button */
#primaryButton {
	background: linear-gradient(135deg, rgba(0, 225, 255, 0.5), rgba(115, 110, 254, 0.5));
	border: 1px solid rgba(0, 225, 255, 0.7);
	box-shadow: 0 0 18px rgba(0, 225, 255, 0.25);
	margin-left: auto;
	margin-right: auto;
}

#primaryButton:hover {
	border-color: #736EFE;
	box-shadow: 0 0 28px rgba(115, 110, 254, 0.5),
		0 0 16px rgba(0, 225, 255, 0.3);
}
</style>
