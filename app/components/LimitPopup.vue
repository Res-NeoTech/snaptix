<script setup lang="ts">
const props = defineProps<{ type: 'none' | 'guest' | 'user' | 'premium' }>();
const emit = defineEmits<{ (e: 'hide'): void }>();
</script>

<template>
	<Teleport to="body">
		<section
			class="fixed inset-0 z-10 w-screen h-screen flex flex-col items-center justify-center"
			:class="props.type === 'none' ? 'hiddenLoader' : ''"
		>
			<div
				v-if="type === 'guest'"
				class="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8"
			>
				<div class="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-0">
					<NuxtImg
						src="/snaptix.png"
						class="w-16 sm:w-20 md:w-25 mb-4 sm:mb-0 sm:mr-5"
						draggable="false"
					/>
					<h1 class="text-3xl sm:text-4xl md:text-5xl">
						SnapTix
					</h1>
				</div>
				<p class="mt-8 sm:mt-16 md:mt-25 px-4">
					Enjoy Snaptix? Create a free account for more benefits such as:
				</p>
				<ul class="w-full max-w-md px-6 sm:px-8 md:px-0">
					<li class="flex items-start sm:items-center mb-3">
						<Icon
							name="mingcute:scale-fill"
							style="color: #F1F1F1"
							class="mr-2 mt-1 sm:mt-0 shrink-0"
						/>
						<span>Less limitations</span>
					</li>
					<li class="flex items-start sm:items-center mb-3">
						<Icon
							name="mingcute:bulb-2-fill"
							style="color: #F1F1F1"
							class="mr-2 mt-1 sm:mt-0 shrink-0"
						/>
						<span>Smarter responses</span>
					</li>
					<li class="flex items-start sm:items-center mb-3">
						<Icon
							name="mingcute:unlock-fill"
							style="color: #F1F1F1"
							class="mr-2 mt-1 sm:mt-0 shrink-0"
						/>
						<span>More features to come</span>
					</li>
				</ul>
				<div class="flex flex-col sm:flex-row items-center justify-center p-5 gap-3 sm:gap-2 w-full max-w-md">
					<button
						id="secondaryButton"
						class="w-full sm:w-auto sm:flex-1 px-4 py-2 text-[#F1F1F1] text-base sm:text-lg flex items-center justify-center h-12 sm:h-15"
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
						class="w-full sm:w-auto sm:flex-1 px-4 py-2 text-[#F1F1F1] text-base sm:text-lg flex items-center justify-center h-12 sm:h-15"
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
				<h3
					class="text-[#00E1FF] hover:text-[#736EFE] cursor-pointer mt-8 sm:mt-12 text-base sm:text-lg"
					@click="emit('hide')"
				>
					Dismiss
				</h3>
				<p
					class="text-[#F1F1F1] text-sm sm:text-base md:text-lg text-center w-full sm:w-4/5 md:w-2/3 mt-8 sm:mt-12 px-4"
				>
					By creating an account, you agree to SnapTix's Terms of Use and confirm that you are familiar with
					our
					<NuxtLink
						class="text-[#00E1FF] hover:text-[#736EFE]"
						to="/privacy-policy"
					>Privacy Policy</NuxtLink>
					.
				</p>
			</div>
			<div
				v-else-if="type === 'user'"
				class="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8"
			>
				<div class="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-0">
					<NuxtImg
						src="/snaptix.png"
						class="w-16 sm:w-20 md:w-25 mb-4 sm:mb-0 sm:mr-5"
						draggable="false"
					/>
					<h1 class="text-3xl sm:text-4xl md:text-5xl">
						SnapTix
					</h1>
				</div>
				<p class="mt-8 sm:mt-12 md:mt-20 separator px-4">
					<strong>You've reached your daily correction limit. But no worries —
						you've got options:</strong>
				</p>
				<ul class="w-full max-w-2xl px-6 sm:px-8 md:px-12">
					<li class="flex items-start mb-4">
						<Icon
							name="material-symbols:crown-rounded"
							style="color: #F1F1F1"
							class="mr-2 mt-1 shrink-0"
						/>
						<span>Become a Premium member and unlock way more corrections every day.</span>
					</li>
					<li class="flex items-start mb-4">
						<Icon
							name="mingcute:time-duration-fill"
							style="color: #F1F1F1"
							class="mr-2 mt-1 shrink-0"
						/>
						<span>Or just wait a few hours until your free quota resets.</span>
					</li>
				</ul>
				<p class="mt-6 sm:mt-8 md:mt-10 separator px-4">
					<strong>By upgrading to Premium, you also get:</strong>
				</p>
				<ul class="w-full max-w-2xl px-6 sm:px-8 md:px-12">
					<li class="flex items-start mb-4">
						<Icon
							name="mingcute:scale-fill"
							style="color: #F1F1F1"
							class="mr-2 mt-1 shrink-0"
						/>
						<span>Larger daily limit (up to 50 corrections/day)</span>
					</li>
					<li class="flex items-start mb-4">
						<Icon
							name="mingcute:bulb-2-fill"
							style="color: #F1F1F1"
							class="mr-2 mt-1 shrink-0"
						/>
						<span>Smarter & more accurate responses</span>
					</li>
					<li class="flex items-start mb-4">
						<Icon
							name="mingcute:unlock-fill"
							style="color: #F1F1F1"
							class="mr-2 mt-1 shrink-0"
						/>
						<span>Early access to new features</span>
					</li>
				</ul>
				<button
					id="primaryButton"
					class="w-full max-w-xs sm:max-w-sm px-4 py-2 text-[#F1F1F1] text-base sm:text-lg flex items-center justify-center h-12 sm:h-15 mt-6 sm:mt-8 md:mt-10"
					@click="navigateTo('/pricing')"
				>
					<Icon
						name="solar:tag-price-bold"
						style="color: #F1F1F1"
						class="mr-2"
					/>
					See pricing
				</button>
				<h3
					class="text-[#00E1FF] hover:text-[#736EFE] cursor-pointer mt-4 sm:mt-5 text-base sm:text-lg"
					@click="emit('hide')"
				>
					Dismiss
				</h3>
			</div>
			<div
				v-else
				class="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8"
			>
				<div class="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-0">
					<NuxtImg
						src="/snaptix.png"
						class="w-16 sm:w-20 md:w-25 mb-4 sm:mb-0 sm:mr-5"
						draggable="false"
					/>
					<h1 class="text-3xl sm:text-4xl md:text-5xl">
						SnapTix
					</h1>
				</div>
				<p class="mt-8 sm:mt-12 md:mt-20 px-4">
					<strong>Whoa, Premium star! ✨</strong>
				</p>
				<p class="mt-4 sm:mt-5 px-4">
					<strong>You've hit your daily limit for today.</strong>
				</p>
				<p class="w-full sm:w-3/4 md:w-1/2 mt-4 sm:mt-5 px-4">
					No stress — your quota will reset in a day, and you'll be back to unlimited
					edits in no time.
					Thanks for being a Premium member — we appreciate you and all the magic you create with your
					content! 🩵
				</p>
				<h3
					class="text-[#00E1FF] hover:text-[#736EFE] cursor-pointer mt-6 sm:mt-8 text-base sm:text-lg"
					@click="emit('hide')"
				>
					Dismiss
				</h3>
			</div>
		</section>
	</Teleport>
</template>

<style scoped>
section {
	backdrop-filter: blur(7px);
	opacity: 1;
	visibility: visible;
	transition: opacity 500ms ease, visibility 500ms ease;
	overflow-y: auto;
	padding-top: 1rem;
	padding-bottom: 1rem;
}

.hiddenLoader {
	opacity: 0;
	visibility: hidden;
	pointer-events: none;
}

h1 {
	background: linear-gradient(to right, #00E1FF, #736EFE);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	font-weight: 700;
	text-shadow: 0 0 12px rgba(0, 225, 255, 0.6),
		0 0 20px rgba(115, 110, 254, 0.4);
	letter-spacing: 0.5px;
	transition: transform 0.2s ease;
}

p,
li {
	color: #F1F1F1;
	margin-left: auto;
	margin-right: auto;
	font-size: 1rem;
	text-align: center;
	margin-bottom: 1rem;
}

@media (min-width: 640px) {

	p,
	li {
		font-size: 1.125rem;
	}
}

@media (min-width: 768px) {

	p,
	li {
		font-size: 1.25rem;
		margin-bottom: 1.5rem;
	}
}

.separator {
	margin-bottom: 1.5rem;
}

@media (min-width: 640px) {
	.separator {
		margin-bottom: 2rem;
	}
}

@media (min-width: 768px) {
	.separator {
		margin-bottom: 3rem;
	}
}

li {
	text-align: left;
	list-style-type: none;
	margin-bottom: 0.75rem;
}

@media (min-width: 640px) {
	li {
		margin-bottom: 1rem;
	}
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

@media (hover: none) {
	button:hover {
		transform: none;
	}

	button:active {
		transform: scale(0.98);
	}
}

/* Primary = neon liquid button */
#primaryButton {
	background: linear-gradient(135deg, rgba(0, 225, 255, 0.5), rgba(115, 110, 254, 0.5));
	border: 1px solid rgba(0, 225, 255, 0.7);
	box-shadow: 0 0 18px rgba(0, 225, 255, 0.25);
}

#primaryButton:hover {
	border-color: #736EFE;
	box-shadow: 0 0 28px rgba(115, 110, 254, 0.5),
		0 0 16px rgba(0, 225, 255, 0.3);
}

/* Secondary = frosted glass pill */
#secondaryButton {
	border: 1px solid rgba(255, 255, 255, 0.2);
	background: rgba(255, 255, 255, 0.08);
	box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.05);
}

#secondaryButton:hover {
	border-color: #736EFE;
	background: rgba(255, 255, 255, 0.12);
	box-shadow: 0 0 16px rgba(115, 110, 254, 0.3);
}
</style>
