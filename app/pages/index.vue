<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ParticlesBg from '../components/imported/ParticlesBg.vue';

const nbParticles = ref<number>(0);
const prompt = ref<string>('');
const aiResponse = ref<string>('');
const isLoaderHidden = ref<boolean>(true);

const onUpdatePrompt = (updatedPrompt: string) => {
	prompt.value = updatedPrompt;
};

const onSubmitPrompt = async () => {
	if (prompt.value.trim() !== '') {
		isLoaderHidden.value = false;
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
			v-auto-animate
			:ai-response="aiResponse"
			@regenerate="onSubmitPrompt"
		/>
		<FooterComponent :margin="true" />
	</div>
</template>

<style scoped>
h2 {
	background: linear-gradient(to right, #00E1FF, #736EFE);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	display: inline-block;
	font-weight: 900;
	font-size: xx-large;
	letter-spacing: 1px;
	text-shadow: 0 0 10px rgba(0, 225, 255, 0.4);
}
</style>
