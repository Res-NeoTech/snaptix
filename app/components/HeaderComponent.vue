<script setup lang="ts">
const auth = useAuth();
</script>

<template>
	<header class="flex flex-wrap items-center justify-between">
		<div class="flex items-center justify-center p-5">
			<NuxtImg
				src="/snaptix.png"
				class="w-10 mr-5 cursor-pointer"
				draggable="false"
				@click="navigateTo('/')"
			/>
			<h1
				class="cursor-pointer"
				@click="navigateTo('/')"
			>
				SnapTix
			</h1>
		</div>
		<button
			v-if="auth"
			id="primaryButton"
			class="flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] mx-5 text-lg flex items-center justify-center h-15"
			@click="navigateTo('/dashboard')"
		>
			<Icon
				name="ic:round-dashboard"
				style="color: #F1F1F1"
				class="mr-2"
			/>
			Dashboard
		</button>
		<div
			v-else
			class="flex items-center justify-center p-5 gap-2 w-full sm:w-auto sm:ml-auto"
		>
			<button
				id="secondaryButton"
				class="flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
				@click="navigateTo('/login')"
			>
				<Icon
					name="bx:user"
					style="color: #F1F1F1"
					class="mr-2"
				/>
				Login
			</button>
			<button
				id="primaryButton"
				class="flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
				@click="navigateTo('/signup')"
			>
				<Icon
					name="mingcute:user-add-line"
					style="color: #F1F1F1"
					class="mr-2"
				/>
				Sign Up
			</button>
		</div>
	</header>
</template>

<style scoped>
header {
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(to right, #00E1FF, #736EFE);
  border-image-slice: 1;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(3px);
  box-shadow: 0 0 25px rgba(0, 225, 255, 0.1);
}

h1 {
  background: linear-gradient(to right, #00E1FF, #736EFE);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  font-size: x-large;
  text-shadow: 0 0 12px rgba(0, 225, 255, 0.6),
               0 0 20px rgba(115, 110, 254, 0.4);
  letter-spacing: 0.5px;
  transition: transform 0.2s ease;
}

h1:hover {
  transform: scale(1.05);
}

button {
  border-radius: 18px;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 0.3px;
}

button:hover {
  cursor: pointer;
  transform: translateY(-2px);
}

/* Primary = neon liquid button */
#primaryButton {
  background: linear-gradient(135deg, rgba(0,225,255,0.5), rgba(115,110,254,0.5));
  border: 1px solid rgba(0, 225, 255, 0.7);
  box-shadow: 0 0 18px rgba(0,225,255,0.25);
}

#primaryButton:hover {
  border-color: #736EFE;
  box-shadow: 0 0 28px rgba(115,110,254,0.5),
              0 0 16px rgba(0,225,255,0.3);
}

/* Secondary = frosted glass pill */
#secondaryButton {
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 0 10px rgba(255,255,255,0.05);
}

#secondaryButton:hover {
  border-color: #736EFE;
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 16px rgba(115,110,254,0.3);
}
</style>
