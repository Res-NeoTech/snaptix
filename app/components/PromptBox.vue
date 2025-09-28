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
		<textarea
			ref="promptInput"
			v-model="prompt"
			name="promptArea"
			class="w-4/5 md:w-2/5 text-[#F1F1F1] h-100 placeholder-[#9BA1A6] p-3 text-lg customScrollbar"
			placeholder="Paste anything that makes trouble here..."
		/>
		<button
			id="addContext"
			class="w-4/5 md:w-2/5 mt-10 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
		>
			<Icon
				name="mingcute:plus-fill"
				style="color: #F1F1F1"
				class="mr-2"
			/> Add Context
		</button>
		<button
			id="fix"
			class="w-4/5 md:w-2/5 mt-10 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
			@click="emit('submit-prompt')"
		>
			<Icon
				name="mingcute:screwdriver-line"
				style="color: #F1F1F1"
				class="mr-2"
			/> Fix Now
		</button>
	</div>
</template>

<style scoped>
textarea {
    border-radius: 15px;
    border: 1px solid #00E1FF;
    background-color: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(3px);
    resize: none;
}

textarea:focus, textarea:hover {
    outline: none;
    border: 1px solid #736EFE;
}

button {
    border-radius: 15px;
    backdrop-filter: blur(3px);
}

button:hover {
	cursor: pointer;
}

#fix {
    background-color: rgba(0, 225, 255, 0.5);
    border: 1px solid #00E1FF;
}

#fix:hover {
    border-color: #736EFE;
    background-color: #736efe8c;
}

#addContext {
    border: 1px solid #4D4B4B;
    background-color: rgba(255, 255, 255, 0.06);
}

#addContext:hover {
    border-color: #736EFE;
}
</style>
