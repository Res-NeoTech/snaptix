<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import { ref, watch } from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

// Props and emits
const emit = defineEmits<{ (e: 'regenerate'): void }>();
const props = defineProps<{ aiResponse: string }>();

// Reactive refs
const copyText = ref('Copy');
const renderedMarkdown = ref('');

function escapeHtml(str: string) {
	return str.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

const mdParser = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	highlight: (str, lang) => {
		if (lang && hljs.getLanguage(lang)) {
			return `<pre><code class="hljs">${hljs.highlight(str, { language: lang }).value}</code></pre>`;
		}
		// Use the MarkdownIt utils directly instead of mdParser
		return `<pre><code class="hljs">${escapeHtml(str)}</code></pre>`;
	},
});

// Watch for updates from props.aiResponse
watch(
	() => props.aiResponse,
	(newVal) => {
		renderedMarkdown.value = mdParser.render(newVal || '');
	},
	{ immediate: true }, // render immediately on mount
);

// Copy to clipboard
const copyResponse = async (content: string) => {
	const codeRegex: RegExp = /^```[a-zA-Z0-9_-]+\n([\s\S]*?)\n```$/;
	const match = content.match(codeRegex);

	if (match) {
		content = match[1] as string;
	}

	await navigator.clipboard.writeText(content);
	copyText.value = 'Copied!';
	setTimeout(() => (copyText.value = 'Copy'), 1500);
};
</script>

<template>
	<div class="mt-25 flex flex-col items-center">
		<!-- Rendered Markdown -->
		<div
			class="renderer min-w-2/5 max-w-4/5 p-6 rounded-2xl shadow-lg border border-transparent text-[#F1F1F1] bg-white/5 backdrop-blur-xl prose prose-invert transition-all duration-300 hover:shadow-[#00E1FF]/40 hover:border-[#736EFE]"
			v-html="renderedMarkdown"
		/>

		<!-- Copy button -->
		<UTooltip
			:content="{
				align: 'center',
				side: 'top',
			}"
			text="Copy to clipboard"
		>
			<button
				id="copy"
				class="glass-btn w-4/5 md:w-2/5 mt-10 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
				@click="copyResponse(props.aiResponse)"
			>
				<Icon
					name="mingcute:copy-2-fill"
					class="mr-2 text-[#F1F1F1]"
				/>
				{{ copyText }}
			</button>
		</UTooltip>

		<!-- Regenerate button -->
		<UTooltip text="Regenerate fix">
			<button
				id="regenerate"
				class="glass-btn w-4/5 md:w-2/5 mt-6 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
				@click="emit('regenerate')"
			>
				<Icon
					name="mingcute:refresh-3-fill"
					class="mr-2 text-[#F1F1F1]"
				/>
				Regenerate
			</button>
		</UTooltip>
	</div>
</template>

<style scoped>
/* Shared glass style */
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

/* Regenerate button with accent */
#regenerate {
	border: 1px solid #00E1FF;
	background: linear-gradient(135deg, rgba(0, 225, 255, 0.25), rgba(115, 110, 254, 0.25));
}

/* Copy button more subtle */
#copy {
	border: 1px solid rgba(255, 255, 255, 0.15);
}

/* AI response container */
.renderer {
	border-radius: 20px;
	border: 1px solid rgba(0, 225, 255, 0.4);
	background: rgba(255, 255, 255, 0.06);
	backdrop-filter: blur(3px);
	transition: all 0.3s ease;
}

.renderer:hover {
	border: 1px solid #736EFE;
	box-shadow: 0 6px 30px rgba(115, 110, 254, 0.25);
}
</style>
