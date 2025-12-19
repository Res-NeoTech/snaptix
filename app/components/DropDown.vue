<script lang="ts" setup>
import MarkdownIt from 'markdown-it';

const props = defineProps<{
	title: string;
	content: string;
	customClass?: string;
}>();

const mdParser = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
});

const open = ref<boolean>(false);
</script>

<template>
	<div
		v-auto-animate
		:class="`hover:bg-white/5 p-5 ${customClass}`"
	>
		<div
			class="flex justify-between items-center gap-2 group cursor-pointer"
			@click="open = !open"
		>
			<strong class="text-[#00E1FF] text-xl group-hover:text-[#736EFE]">
				{{ props.title }}
			</strong>

			<Icon
				name="mingcute:square-arrow-down-fill"
				class="text-[#00E1FF] transition-colors transition text-4xl group-hover:text-[#736EFE]"
				:class="{ 'rotate-180': open }"
			/>
		</div>

		<p
			v-if="open"
			class="text-[#F1F1F1] text-lg mt-2 faq-response"
			v-html="mdParser.render(content)"
		/>
	</div>
</template>

<style>
.faq-response a {
    color: #00E1FF;
}

.faq-response a:hover {
    color: #736EFE;
}
</style>
