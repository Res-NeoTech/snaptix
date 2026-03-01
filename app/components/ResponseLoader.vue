<script setup lang="ts">
import SparklesText from './imported/SparklesText.vue';

const props = defineProps<{
	isHidden: boolean;
}>();
</script>

<template>
	<Teleport to="body">
		<div
			class="fixed inset-0 z-10 flex flex-col items-center justify-center"
			:class="props.isHidden ? 'hiddenLoader' : ''"
		>
			<NuxtImg
				src="/snaptix.png"
				class="w-25 mb-25"
				draggable="false"
			/>
			<SparklesText
				text="Generating Correction"
				:colors="{ first: '#00E1FF', second: '#736EFE' }"
				:sparkles-count="25"
				class="text-[#F1F1F1] text-center"
			/>
		</div>
	</Teleport>
</template>

<style scoped>
div {
	backdrop-filter: blur(5px);
	opacity: 1;
	visibility: visible;
	transition: opacity 500ms ease, visibility 500ms ease;
}

.hiddenLoader {
	opacity: 0;
	visibility: hidden;
	pointer-events: none;
}

img {
	animation: rotate 2s ease-in-out infinite;
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>
