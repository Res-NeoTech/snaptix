<script setup lang="ts">
import { ref } from 'vue';
import { useConversationStore } from '~~/lib/utils/useConversationStore';
import ParticlesBg from '../components/imported/ParticlesBg.vue';

useHead({
	title: 'SnapTix',
	meta: [
		{ name: 'description', content: 'SnapTix is an application to fix grammar, emails, and code instantly with AI — no prompt required.' },
	],
});

const nbParticles = ref<number>(Math.round(200 + Math.random() * 50));
const conversation = useConversationStore();
const prompt = ref<string>(conversation.prompt);
const isLoaderHidden = ref<boolean>(true);
const serverSideError = ref<boolean>(false);

enum PopupType {
	NONE = 'none',
	GUEST = 'guest',
	USER = 'user',
	PREMIUM = 'premium',
}

const limitPopupType = ref<PopupType>(PopupType.NONE);

const onUpdatePrompt = (updatedPrompt: string) => {
	prompt.value = updatedPrompt;
};

const onSubmitPrompt = async () => {
	if (prompt.value.trim() !== '') {
		serverSideError.value = false;
		isLoaderHidden.value = false;

		try {
			const data = await $fetch<{ response: string; typeUser?: string }>('/api/fix', {
				method: 'POST',
				body: { prompt: prompt.value },
			});
			conversation.response = data.response;
			setTimeout(() => {
				window.scrollTo({
					top: document.body.scrollHeight,
					behavior: 'smooth',
				});
				isLoaderHidden.value = true;
			}, 100);
			umTrackEvent('fix-completed', {
				userType: data.typeUser,
			});
		}
		catch (err: unknown) {
			// Narrow error type
			const fetchError = err as { status?: number; data?: { response?: string; typeUser?: string } };

			const errorData = fetchError.data;

			if (fetchError.status === 429 && errorData?.typeUser) {
				isLoaderHidden.value = true;
				limitPopupType.value = errorData.typeUser as PopupType;
			}
			else {
				serverSideError.value = true;
				setTimeout(() => {
					window.scrollTo({
						top: document.body.scrollHeight,
						behavior: 'smooth',
					});
					isLoaderHidden.value = true;
				}, 100);
			}
		}
	}
};

const hideLimitPoput = () => {
	limitPopupType.value = PopupType.NONE;
};
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
		<ResponseLoader :is-hidden="isLoaderHidden" />
		<LimitPopup
			:type="limitPopupType"
			@hide="hideLimitPoput"
		/>
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
			v-if="serverSideError"
			v-auto-animate
			class="error-box w-4/5 md:w-2/5 flex items-center justify-between p-4 rounded-lg border border-[#00E1FF]/40 bg-white/5 mt-25 mb-25"
		>
			<p class="text-[#FF4D6D] text-center">
				The server encountered a problem while processing your request.
				Please, retry later. We are deeply sorry for the interruption.
			</p>
		</div>
		<div
			v-if="conversation.response"
			class="flex items-center justify-evenly mt-25 mb-25"
		>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h2 class="text-center">
				AI Response
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<AiBox
			v-if="conversation.response"
			v-auto-animate
			:ai-response="conversation.response"
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

.error-box {
	border-radius: 20px;
	border: 1px solid rgba(255, 111, 111, 0.25);
	background: rgba(255, 105, 105, 0.08);
	backdrop-filter: blur(3px);
	box-shadow: inset 0 0 15px rgba(255, 0, 98, 0.05),
		0 0 12px rgba(255, 0, 43, 0.08);
	margin-left: auto;
	margin-right: auto;
}
</style>
