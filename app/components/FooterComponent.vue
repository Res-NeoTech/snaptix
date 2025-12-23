<script setup lang="ts">
const { data } = await useAsyncData('dynamicData', () =>
	$fetch('/api/dynamic'),
);
const props = defineProps<{ margin?: boolean }>();
</script>

<template>
	<footer :class="[props.margin ? 'mt-25' : '', 'flex flex-col items-center']">
		<div class="flex flex-col items-center p-5 sm:p-6 md:p-8 text-center max-w-4xl mx-auto w-full">
			<h2 class="text-[#F1F1F1] text-sm sm:text-base md:text-lg">
				&copy;{{ data?.year }} SnapTix, all rights reserved.
			</h2>
			<h2 class="text-[#F1F1F1] text-center text-xs sm:text-sm md:text-base mt-2 px-4">
				{{ data?.quote }}
			</h2>
		</div>
		<div class="flex flex-col sm:flex-row justify-center sm:justify-evenly items-center gap-4 sm:gap-6 md:gap-8 pb-5 sm:pb-6 md:pb-8 w-full px-4 sm:w-2/3 md:w-1/2 lg:w-1/3">
			<NuxtLink
				class="text-[#00E1FF] hover:text-[#736EFE] transition-colors duration-300 text-sm sm:text-base whitespace-nowrap"
				to="/privacy-policy"
			>
				Privacy Policy
			</NuxtLink>
			<NuxtLink
				class="text-[#00E1FF] hover:text-[#736EFE] transition-colors duration-300 text-sm sm:text-base whitespace-nowrap"
				to="/terms-of-use"
			>
				Terms Of Use
			</NuxtLink>
			<NuxtLink
				class="text-[#00E1FF] hover:text-[#736EFE] transition-colors duration-300 text-sm sm:text-base whitespace-nowrap"
				to="/pricing"
			>
				Pricing
			</NuxtLink>
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
  margin: 0;
  text-shadow: 0 0 8px rgba(0, 225, 255, 0.25);
  line-height: 1.6;
}

footer h2:nth-of-type(1) {
  font-weight: 600;
  color: #e1e1e1;
  text-shadow: 0 0 10px rgba(0, 225, 255, 0.35);
}

@media (max-width: 640px) {
  footer {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
}
</style>
