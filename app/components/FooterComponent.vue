<script setup lang="ts">
const { data } = await useAsyncData('dynamicData', () =>
	$fetch('/api/dynamic'),
);

const props = defineProps<{ margin?: boolean }>();
</script>

<template>
	<footer :class="[props.margin ? 'mt-25' : '', 'flex flex-col items-center']">
		<div class="flex flex-col items-center p-5 text-center">
			<h2 class="text-[#F1F1F1]">
				&copy;{{ data?.year }} SnapTix, all rights reserved.
			</h2>
			<h2 class="text-[#F1F1F1] text-center">
				{{ data?.quote }}
			</h2>
		</div>
		<div class="flex flex-row justify-evenly pb-5 w-1/3">
			<NuxtLink
				class="text-[#00E1FF] hover:text-[#736EFE]"
				to="/privacy-policy"
			>Privacy Policy</NuxtLink>
		</div>
	</footer>
</template>

<style scoped>
footer {
  border-top: 2px solid transparent;
  border-image: linear-gradient(to right, #00E1FF, #736EFE);
  border-image-slice: 1;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(3px);
  box-shadow: 0 -4px 25px rgba(0, 225, 255, 0.08);
  padding-top: 1rem;
  padding-bottom: 1rem;
}

footer h2 {
  font-size: 1rem;
  font-weight: 500;
  color: #f1f1f1;
  margin: 0.3rem 0;
  text-shadow: 0 0 8px rgba(0, 225, 255, 0.25);
}

footer h2:nth-of-type(1) {
  font-weight: 600;
  color: #e1e1e1;
  text-shadow: 0 0 10px rgba(0, 225, 255, 0.35);
}
</style>
