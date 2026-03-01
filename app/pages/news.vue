<script setup lang="ts">
import type { ChangelogVersionProps } from '@nuxt/ui';

const versions = ref<ChangelogVersionProps[]>([
	{
		title: 'Spring Front-End Update',
		description: 'After a few quiet months, we’re back — and SnapTix is better than ever. This update focuses on stability, refinement, and overall experience. We’ve resolved several bugs, polished the interface, and made subtle but meaningful improvements across the app to ensure everything feels smoother and more responsive.',
		date: '2026-03-5',
		badge: 'Patch',
		ui: {
			badge: 'bg-transparent border-[#F1F1F1] border-1 select-none text-[#F1F1F1]',
			dotInner: 'bg-[#00E1FF]',
		},
	},
	{
		title: 'SnapTix Launch',
		description: 'After months of building, refining, breaking things, and rebuilding them better — SnapTix is officially live. This marks our final launch of 2025, and we couldn’t be more excited to ship it. SnapTix is designed to make content correction effortless. Whether it’s text, code, or any structured content, SnapTix helps you clean it up with an extremely smooth and intuitive flow. No friction. No overcomplication. Just fast, accurate corrections when you need them.',
		date: '2025-12-24',
		badge: 'Release',
		ui: {
			badge: 'bg-transparent border-[#00E1FF] border-1 select-none text-[#00E1FF]',
			dotInner: 'bg-[#00E1FF]',
		},
	},
]);
</script>

<template>
	<div class="flex items-center justify-evenly mt-25">
		<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		<h1 class="text-center">
			News & Insights
		</h1>
		<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
	</div>
	<section class="w-4/5 ml-auto mr-auto mt-25">
		<UChangelogVersions
			:ui="{ beam: 'bg-[#00E1FF]' }"
			:versions="versions"
		/>
	</section>
</template>

<style>
h2 {
  font-size: x-large;
}
</style>
