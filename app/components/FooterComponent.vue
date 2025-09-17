<script setup lang="ts">
const { data } = await useAsyncData('dynamicData', () =>
	$fetch('/api/dynamic'),
);
</script>

<template>
	<footer class="mt-25">
		<div class="flex flex-col items-center p-5">
			<h2 class="text-[#F1F1F1]">
				&copy;{{ data?.year }} SnapTix, all rights reserved.
			</h2>
			<h2 class="text-[#F1F1F1]">
				{{ data?.quote }}
			</h2>
		</div>
	</footer>
</template>

<style scoped>
footer {
	border-top: 2px solid transparent;
	border-image: linear-gradient(to right, #5EFCE8, #736EFE);
	border-image-slice: 1;
	background-color: rgba(255, 255, 255, 0.06);
	backdrop-filter: blur(3px);
}
</style>
