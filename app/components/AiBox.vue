<script setup lang="ts">
import { ref, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

// Props and emits
const emit = defineEmits<{ (e: 'regenerate'): void }>()
const props = defineProps<{ aiResponse: string }>()

// Reactive refs
const copyText = ref('Copy')
const renderedMarkdown = ref('')

function escapeHtml(str: string) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
}

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre><code class="hljs">${hljs.highlight(str, { language: lang }).value}</code></pre>`
    }
    // Use the MarkdownIt utils directly instead of mdParser
    return `<pre><code class="hljs">${escapeHtml(str)}</code></pre>`
  }
})

// Watch for updates from props.aiResponse
watch(
  () => props.aiResponse,
  (newVal) => {
    renderedMarkdown.value = mdParser.render(newVal || '')
  },
  { immediate: true } // render immediately on mount
)

// Copy to clipboard
const copyResponse = async () => {
  await navigator.clipboard.writeText(props.aiResponse)
  copyText.value = 'Copied!'
  setTimeout(() => (copyText.value = 'Copy'), 1500)
}
</script>

<template>
  <div class="mt-25 flex flex-col items-center">
    <!-- Rendered Markdown -->
    <div
      class="renderer w-2/5 p-3 rounded-xl border border-[#00E1FF] text-[#F1F1F1] bg-black/20 prose prose-invert"
      v-html="renderedMarkdown"
    />

    <!-- Copy button -->
    <button
      id="copy"
      class="w-2/5 mt-10 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
      @click="copyResponse"
    >
      <Icon
        name="mingcute:copy-2-fill"
        style="color: #F1F1F1"
        class="mr-2"
      />
      {{ copyText }}
    </button>

    <!-- Regenerate button -->
    <button
      id="regenerate"
      class="w-2/5 mt-10 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
      @click="emit('regenerate')"
    >
      <Icon
        name="mingcute:refresh-3-fill"
        style="color: #F1F1F1"
        class="mr-2"
      />
      Regenerate
    </button>
  </div>
</template>

<style scoped>
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

.renderer {
  border-radius: 15px;
  border: 1px solid #00E1FF;
  background-color: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(3px);
  resize: none;
}

.renderer:hover {
  outline: none;
  border: 1px solid #736EFE;
}
</style>