<script setup lang="ts">
import { ref } from 'vue';

useHead({
	title: 'Log-In | SnapTix',
	meta: [
		{ name: 'description', content: 'Log-In to your SnapTix account to instantly fix code, text, and content with AI. Paste it, fix it, done.' },
	],
});

// Form Values
const email = ref<string>('');
const password = ref<string>('');

const signButtonText = ref<string>('Log-In');
const serverSideError = ref<boolean>(false);
const unauthorized = ref<boolean>(false);
const rateLimited = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);

const login = async () => {
	if (isSubmitting.value) return;
	if (!email.value || !password.value) return;

	isSubmitting.value = true;
	signButtonText.value = 'Please Wait...';
	serverSideError.value = false;
	unauthorized.value = false;
	rateLimited.value = false;

	try {
		await $fetch('/api/auth/login', {
			method: 'POST',
			body: {
				email: email.value,
				password: password.value,
			},
		});

		navigateTo('/dashboard', { redirectCode: 301 });
	}
	catch (error: unknown) {
		const status: number = (error as { status?: number })?.status as number;
		if (status === 401) {
			unauthorized.value = true;
		}
		else if (status === 429) {
			rateLimited.value = true;
		}
		else {
			serverSideError.value = true;
		}
	}
	finally {
		isSubmitting.value = false;
		signButtonText.value = 'Log-In';
	}
};
</script>

<template>
	<article
		v-auto-animate
		class="flex flex-col items-center w-full"
	>
		<div class="flex items-center justify-evenly mt-25 w-full">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			<h1 class="text-center">
				Welcome back !
			</h1>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
		</div>
		<input
			id="emailInput"
			v-model="email"
			class="h-15 w-4/5 md:w-2/5 placeholder:text-[#818181] p-5 text-lg text-[#F1F1F1] mt-25"
			type="email"
			name="email"
			placeholder="E-Mail"
		>
		<input
			id="passwordInput"
			v-model="password"
			class="h-15 w-4/5 md:w-2/5 placeholder:text-[#818181] p-5 text-lg text-[#F1F1F1] mt-10"
			type="password"
			name="password"
			placeholder="Password"
		>
		<p
			v-if="unauthorized"
			class="formError w-4/5 md:w-2/5 mt-10 text-lg"
		>
			Incorrect login credentials. Please try again.
		</p>
		<button
			id="submit"
			type="button"
			:disabled="!(email && password) || isSubmitting"
			class="h-15 w-4/5 md:w-2/5 text-[#F1F1F1] text-lg flex items-center justify-center mt-10 hover:cursor-pointer"
			@click="login"
		>
			<Icon
				name="bx:user"
				style="color: #F1F1F1"
				class="mr-2"
			/> {{ signButtonText }}
		</button>
		<p
			v-if="serverSideError"
			class="formError w-4/5 md:w-2/5 mt-10 text-lg"
		>
			Something unexpected happened. Please, try again later.
		</p>
		<p
			v-if="rateLimited"
			class="formError w-4/5 md:w-2/5 mt-10 text-lg"
		>
			Too many login attempts. Please wait a moment.
		</p>
		<p class="text-[#F1F1F1] text-lg text-center w-2/3 mt-25">
			New to SnapTix? <NuxtLink
				class="text-[#00E1FF] hover:text-[#736EFE]"
				to="/signup"
			>Create Account
			</NuxtLink> for free!
		</p>
	</article>
</template>

<style scoped>
input {
	border-radius: 20px;
	border: 1px solid rgba(255, 255, 255, 0.25);
	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(12px);
	color: #f1f1f1;
	transition: all 0.3s ease;
	box-shadow: inset 0 0 15px rgba(0, 225, 255, 0.05),
		0 0 12px rgba(0, 225, 255, 0.08);
}

input:focus,
input:hover {
	outline: none;
	border: 1px solid #00E1FF;
	box-shadow: 0 0 20px rgba(0, 225, 255, 0.4);
	background: rgba(255, 255, 255, 0.12);
}

button {
	border-radius: 20px;
	backdrop-filter: blur(8px);
	transition: all 0.3s ease;
}

#submit {
	background: linear-gradient(135deg, rgba(0, 225, 255, 0.5), rgba(115, 110, 254, 0.5));
	border: 1px solid rgba(0, 225, 255, 0.7);
	box-shadow: 0 0 25px rgba(0, 225, 255, 0.25);
	font-weight: 600;
	letter-spacing: 0.5px;
}

#submit:hover:not(:disabled) {
	border-color: #736EFE;
	box-shadow: 0 0 35px rgba(115, 110, 254, 0.5),
		0 0 20px rgba(0, 225, 255, 0.3);
	transform: translateY(-2px);
}

#submit:disabled {
	background: rgba(1, 171, 194, 0.3);
	border: 1px solid rgba(1, 189, 214, 0.6);
	box-shadow: none;
	cursor: not-allowed;
}

.formError {
	color: #ff4d6d;
	text-align: left;
	margin-left: 50px;
	font-weight: 500;
	text-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
}
</style>
