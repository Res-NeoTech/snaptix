<template>
	<header>
		<div class="flex items-center justify-center p-5">
			<NuxtImg
				src="/snaptix.png"
				class="w-10 mr-5"
				draggable="false"
			/>
			<h1>SnapTix</h1>
		</div>
	</header>
</template>

<style scoped>
header {
	border-bottom: 2px solid transparent;
	border-image: linear-gradient(to right, #5EFCE8, #736EFE);
	border-image-slice: 1;
	background-color: rgba(255, 255, 255, 0.06);
	backdrop-filter: blur(3px);
}

h1 {
	background: linear-gradient(to right, #00E1FF, #005C68);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	display: inline-block;
	font-weight: 600;
	font-size: x-large;
}
</style>
