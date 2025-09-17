<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ParticlesBg from './components/imported/ParticlesBg.vue';

const nbParticles = ref<number>(0);
const prompt = ref<string>('');
const aiResponse = ref<string>('');
const isLoaderHidden = ref<boolean>(true);

const onUpdatePrompt = (updatedPrompt: string) => {
	prompt.value = updatedPrompt;
};

const onSubmitPrompt = async () => {
	isLoaderHidden.value = false;
	if (prompt.value.trim() !== '') {
		const response = await $fetch<{ response?: string; error?: string }>('/api/fix', {
			method: 'POST',
			body: { prompt: prompt.value },
		});

		if (response?.response) {
			aiResponse.value = response.response;
			setTimeout(() => {
				window.scrollTo({
					top: document.body.scrollHeight,
					behavior: 'smooth',
				});
				isLoaderHidden.value = true;
			}, 100);
		}
		else if (response?.error) {
			console.error('API error:', response.error);
		}
	}
};

onMounted(() => nbParticles.value = Math.round(200 + Math.random() * 50));
</script>

<template>
	<div class="min-h-screen bg-[#0D1117] overflow-hidden">
		<NuxtRouteAnnouncer />
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
		<ResponseLoader :is-hidden="isLoaderHidden" />
		<HeaderComponent />
		<div class="flex items-center justify-evenly mt-25">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				Fix anything. No prompt needed.
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<PromptBox
			@update-prompt="onUpdatePrompt"
			@submit-prompt="onSubmitPrompt"
		/>
		<div
			v-if="aiResponse"
			class="flex items-center justify-evenly mt-25 mb-25"
		>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				AI Response
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<AiBox
			v-if="aiResponse"
			:ai-response="aiResponse"
			@regenerate="onSubmitPrompt"
		/>
		<FooterComponent />
	</div>
</template>

<style scoped>
h2 {
	background: linear-gradient(to right, #00E1FF, #005C68);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	display: inline-block;
	font-weight: 900;
	font-size: xx-large;
}
</style>
