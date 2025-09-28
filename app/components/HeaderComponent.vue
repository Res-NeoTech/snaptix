<script setup lang="ts">
const auth = useAuth();

const goHome = () => {
	navigateTo('/');
};

const goSignup = () => {
	navigateTo('/signup')
}

const goLogin = () => {
	navigateTo('/login')
}

const goDashboard = () => {
	navigateTo('/dashboard')
}
</script>

<template>
	<header class="flex items-center justify-between">
		<div class="flex items-center justify-center p-5">
			<NuxtImg src="/snaptix.png" class="w-10 mr-5 cursor-pointer" draggable="false" @click="goHome" />
			<h1 class="cursor-pointer" @click="goHome">
				SnapTix
			</h1>
		</div>
		<button v-if="auth" id="primaryButton" @click="goDashboard"
				class="flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] mx-5 text-lg flex items-center justify-center h-15">
				<Icon name="ic:round-dashboard" style="color: #F1F1F1" class="mr-2" />
				Dashboard
		</button>
		<div v-else class="flex items-center justify-center p-5 gap-2 
			       w-full sm:w-auto sm:ml-auto">
			<button id="secondaryButton" @click="goLogin"
				class="flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15">
				<Icon name="bx:user" style="color: #F1F1F1" class="mr-2" />
				Login
			</button>
			<button id="primaryButton" @click="goSignup"
				class="flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15">
				<Icon name="mingcute:user-add-line" style="color: #F1F1F1" class="mr-2" />
				Sign Up
			</button>
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
	text-shadow: 0px 0px 15px #00E1FF;
}

button {
	border-radius: 15px;
	backdrop-filter: blur(3px);
}

button:hover {
	cursor: pointer;
}

#primaryButton {
	background-color: rgba(0, 225, 255, 0.5);
	border: 1px solid #00E1FF;
}

#primaryButton:hover {
	border-color: #736EFE;
	background-color: #736efe8c;
}

#secondaryButton {
	border: 1px solid #4D4B4B;
	background-color: rgba(255, 255, 255, 0.06);
}

#secondaryButton:hover {
	border-color: #736EFE;
}
</style>
