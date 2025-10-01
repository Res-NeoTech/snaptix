<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits<{
	(e: 'update-prompt', prompt: string): void;
	(e: 'submit-prompt'): void;
}>();

const prompt = ref('');

watch(prompt, (newVal) => {
	emit('update-prompt', newVal);
});
</script>

<template>
	<div class="mt-25 flex flex-col items-center">
		<!-- Prompt textarea -->
		<textarea
			ref="promptInput"
			v-model="prompt"
			name="promptArea"
			class="prompt-box w-4/5 md:w-2/5 h-100 p-4 text-lg text-[#F1F1F1] placeholder-[#9BA1A6] customScrollbar"
			placeholder="Paste anything that makes trouble here..."
		/>

		<!-- Add Context button -->
		<button
			id="addContext"
			class="glass-btn subtle-btn w-4/5 md:w-2/5 mt-10 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
		>
			<Icon
				name="mingcute:plus-fill"
				class="mr-2 text-[#F1F1F1]"
			/>
			Add Context
		</button>

		<!-- Fix Now button -->
		<button
			id="fix"
			class="glass-btn accent-btn w-4/5 md:w-2/5 mt-6 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
			@click="emit('submit-prompt')"
		>
			<Icon
				name="mingcute:screwdriver-line"
				class="mr-2 text-[#F1F1F1]"
			/>
			Fix Now
		</button>
	</div>
</template>

<style scoped>
/* Prompt textarea with liquid glass */
.prompt-box {
  border-radius: 18px;
  border: 1px solid rgba(0, 225, 255, 0.4);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(3px);
  resize: none;
  transition: all 0.3s ease;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);
}

.prompt-box:focus,
.prompt-box:hover {
  outline: none;
  border: 1px solid #736EFE;
  box-shadow: 0 6px 28px rgba(115, 110, 254, 0.35);
}

/* Base glass button */
.glass-btn {
  border-radius: 15px;
  backdrop-filter: blur(3px);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.glass-btn:hover {
  cursor: pointer;
  border-color: #736EFE;
  background: rgba(0, 225, 255, 0.12);
  box-shadow: 0 6px 25px rgba(115, 110, 254, 0.4);
}

/* Accent button (Fix Now) */
.accent-btn {
  border: 1px solid #00E1FF;
  background: linear-gradient(135deg, rgba(0, 225, 255, 0.25), rgba(115, 110, 254, 0.25));
}

.accent-btn:hover {
  background: linear-gradient(135deg, rgba(0, 225, 255, 0.25), rgba(115, 110, 254, 0.25));
}

/* Subtle button (Add Context) */
.subtle-btn {
  border: 1px solid rgba(255, 255, 255, 0.15);
}
</style>