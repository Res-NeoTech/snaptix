<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits<{
	(e: 'regenerate'): void;
}>();

const props = defineProps<{
	aiResponse: string;
}>();

const aiResponse = ref<string>(props.aiResponse);
const copyText = ref<string>('Copy');

watch(() => props.aiResponse, (newVal: string) => {
	aiResponse.value = newVal;
});

const copyResponse = () => {
	copyText.value = 'Copied!';
	navigator.clipboard.writeText(aiResponse.value);
	setTimeout(() => copyText.value = 'Copy', 1500);
};
</script>

<template>
	<div class="mt-25 flex flex-col items-center">
		<textarea
			v-model="aiResponse"
			name="responseArea"
			class="w-2/5 text-[#F1F1F1] h-100 placeholder-[#9BA1A6] p-3 text-lg"
			readonly
		/>
		<button
			id="copy"
			class="w-2/5 mt-10 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
			@click="copyResponse"
		>
			<Icon
				name="mingcute:copy-2-fill"
				style="color: #F1F1F1"
				class="mr-2"
			/> {{ copyText }}
		</button>
		<button
			id="regenerate"
			class="w-2/5 mt-10 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
			@click="emit('regenerate')"
		>
			<Icon
				name="mingcute:refresh-3-fill"
				style="color: #F1F1F1"
				class="mr-2"
			/> Regenerate
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

textarea:focus {
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

#regenerate {
    background-color: rgba(0, 225, 255, 0.5);
    border: 1px solid #00E1FF;
}

#regenerate:hover {
    border-color: #736EFE;
    background-color: #736efe8c;
}

#copy {
    border: 1px solid #4D4B4B;
    background-color: rgba(255, 255, 255, 0.06);
}

#copy:hover {
    border-color: #736EFE;
}
</style>
