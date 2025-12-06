<script setup lang="ts">
const props = defineProps<{ type: 'none' | 'guest' | 'user' | 'premium' }>();
const emit = defineEmits<{ (e: 'hide'): void }>();

const divClassString = computed<string>(() => `fixed z-10 w-screen h-screen flex flex-col items-center justify-center ${props.type === 'none' ? 'hiddenLoader' : ''}`);

const goSignup = () => {
	navigateTo('/signup');
};

const goLogin = () => {
	navigateTo('/login');
};
</script>

<template>
	<section :class="divClassString">
		<div v-if="type === 'guest'" class="flex flex-col items-center justify-center">
			<div class="flex items-center justify-center">
				<NuxtImg src="/snaptix.png" class="w-25 mr-5" draggable="false" />
				<h1>
					SnapTix
				</h1>
			</div>
			<p class="mt-25 ">
				Enjoy Snaptix? Create a free account for more benefits such as:
			</p>
			<ul>
				<li class="flex items-center">
					<Icon name="mingcute:scale-fill" style="color: #F1F1F1" class="mr-2" />Less limitations
				</li>
				<li class="flex items-center">
					<Icon name="mingcute:bulb-2-fill" style="color: #F1F1F1" class="mr-2" />Smarter responses
				</li>
				<li class="flex items-center">
					<Icon name="mingcute:unlock-fill" style="color: #F1F1F1" class="mr-2" />More features to come
				</li>
			</ul>
			<div class="flex items-center justify-center p-5 gap-2 w-full sm:w-auto">
				<button id="secondaryButton"
					class="sm:flex-none w-2/3 px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
					@click="goLogin">
					<Icon name="bx:user" style="color: #F1F1F1" class="mr-2" />
					Login
				</button>
				<button id="primaryButton"
					class="sm:flex-none w-2/3 px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
					@click="goSignup">
					<Icon name="mingcute:user-add-line" style="color: #F1F1F1" class="mr-2" />
					Sign Up
				</button>
			</div>
			<h3 class="text-[#00E1FF] hover:text-[#736EFE] cursor-pointer mt-12" @click="emit('hide')">
				Dismiss
			</h3>
			<p class="text-[#F1F1F1] text-lg text-center w-2/3 mt-12">
				By creating an account, you agree to SnapTix's Terms of Use and confirm that you are familiar with our
				<NuxtLink class="text-[#00E1FF] hover:text-[#736EFE]" to="/privacy-policy">Privacy Policy</NuxtLink>.
			</p>
		</div>
		<div v-else-if="type === 'user'" class="flex flex-col items-center justify-center">
			<div class="flex items-center justify-center">
				<NuxtImg src="/snaptix.png" class="w-25 mr-5" draggable="false" />
				<h1>
					SnapTix
				</h1>
			</div>
			<p class="mt-20 separator">
				<strong>You&apos;ve reached your daily correction limit. But no worries —
					you&apos;ve got options:</strong>
			</p>
			<ul>
				<li class="flex items-center">
					<Icon name="material-symbols:crown-rounded" style="color: #F1F1F1" class="mr-2" /> Become a
					Premium member and unlock way more corrections every day.
				</li>
				<li class="flex items-center">
					<Icon name="mingcute:time-duration-fill" style="color: #F1F1F1" class="mr-2" /> Or just wait a few
					hours until your free quota resets.
				</li>
			</ul>
			<p class="mt-10 separator">
				<strong>By upgrading to Premium, you also get:</strong>
			</p>
			<ul>
				<li class="flex items-center">
					<Icon name="mingcute:scale-fill" style="color: #F1F1F1" class="mr-2" />Larger daily limit
					(up to 50 corrections/day)
				</li>
				<li class="flex items-center">
					<Icon name="mingcute:bulb-2-fill" style="color: #F1F1F1" class="mr-2" />Smarter & more
					accurate responses
				</li>
				<li class="flex items-center">
					<Icon name="mingcute:unlock-fill" style="color: #F1F1F1" class="mr-2" />Early access to new
					features
				</li>
			</ul>
			<button id="primaryButton"
				class="sm:flex-none w-2/3 px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15 mt-10"
				@click="goLogin">
				<Icon name="solar:tag-price-bold" style="color: #F1F1F1" class="mr-2" />
				See pricing
			</button>
			<h3 class="text-[#00E1FF] hover:text-[#736EFE] cursor-pointer mt-5" @click="emit('hide')">
				Dismiss
			</h3>
		</div>
		<div v-else class="flex flex-col items-center justify-center">
			<div class="flex items-center justify-center">
				<NuxtImg src="/snaptix.png" class="w-25 mr-5" draggable="false" />
				<h1>
					SnapTix
				</h1>
			</div>
			<p class="mt-20">
				<strong>Whoa, Premium star! ✨</strong>
			</p>
			<p class="mt-5">
				<strong>You’ve hit your daily limit for today.</strong>
			</p>
			<p class="w-1/2 mt-5">No stress — your quota will reset in a few hours, and you&apos;ll be back to unlimited
				edits in no time.
				Thanks for being a Premium member — we appreciate you and all the magic you create with your text! 🩵
			</p>
			<h3 class="text-[#00E1FF] hover:text-[#736EFE] cursor-pointer mt-5" @click="emit('hide')">
				Dismiss
			</h3>
		</div>
	</section>
</template>

<style scoped>
section {
	backdrop-filter: blur(7px);
	opacity: 1;
	visibility: visible;
	transition: opacity 500ms ease, visibility 500ms ease;
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
	font-size: xxx-large;
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
	font-size: large;
	text-align: center;
	margin-bottom: 25px;
}

.separator {
	margin-bottom: 50px;
}

li {
	text-align: left;
	list-style-type: disc;
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
