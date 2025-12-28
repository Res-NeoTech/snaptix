<script lang="ts" setup>
import ParticlesBg from '../components/imported/ParticlesBg.vue';
import ParticleImage from '~/components/imported/ParticleImage/ParticleImage.vue';

useHead({
	title: 'SnapTix Premium',
});

const nbParticles = ref<number>(Math.round(200 + Math.random() * 50));

onMounted(() => {
	const auth = useAuth();

	if (auth.value) {
		umTrackRevenue('subscription-success', 3, 'USD');
	}
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
		<div class="mt-10">
			<ParticleImage
				image-src="/fullLogo.svg"
				:responsive-width="true"
				canvas-width="960"
				canvas-height="213"
			/>
		</div>
		<div class="flex items-center justify-evenly mt-10">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h1 class="text-center">
				Welcome to SnapTix Premium 🚀
			</h1>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<p class="mt-25 text-center">
			Your payment seems to be successful, and your premium access is now active.
		</p>
		<p class="text-center">
			Thanks for supporting SnapTix — enjoy the extra features!
		</p>
		<p class="text-center">
			We&apos;re actively developing SnapTix, so check back often to see new features and improvements you can
			enjoy!
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

p {
	color: #F1F1F1;
	width: 75%;
	margin-left: auto;
	margin-right: auto;
	font-size: large;
	margin-bottom: 25px;
}
</style>
