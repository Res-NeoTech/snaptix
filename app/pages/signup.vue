<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import validator from 'validator';
import { validatePassword } from '~~/lib/utils/validators';
import ParticlesBg from '../components/imported/ParticlesBg.vue';

// Form Values
const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const rPassword = ref<string>('');

const signButtonText = ref<string>('Create Account');
const serverSideError = ref<boolean>(false);
const emailTaken = ref<boolean>(false);

const diagnostics = computed(() => {
	return {
		usernameValid: username.value.length > 3 && username.value.length <= 100,
		emailValid: validator.isEmail(email.value),
		passwordValid: validatePassword(password.value),
		passwordRepeated: password.value === rPassword.value,
	};
});

const validData = computed<boolean>(() => {
	return diagnostics.value.usernameValid
		&& diagnostics.value.emailValid
		&& diagnostics.value.passwordValid
		&& diagnostics.value.passwordRepeated;
});

const nbParticles = ref<number>(0);
onMounted(() => nbParticles.value = Math.round(200 + Math.random() * 50));

const createAccount = async () => {
	signButtonText.value = 'Please Wait...';
	serverSideError.value = false;
	emailTaken.value = false;
	const { data, pending, error } = await useFetch('/api/auth/signup', {
		method: 'POST',
		body: {
			username,
			email,
			password,
		},
		onResponse({ response }) {
			if (response.status === 201) {
				navigateTo('/dashboard');
			}
		},
		onResponseError({ response }) {
			if (response.status === 409) {
				emailTaken.value = true;
			}
			else {
				serverSideError.value = true;
			}
		},
	});

	signButtonText.value = 'Create Account';
};
</script>

<template>
	<div class="min-h-screen bg-[#0D1117] overflow-hidden">
		<ClientOnly>
			<ParticlesBg
				class="absolute inset-0 w-full h-full pointer-events-none z-0 fixed"
				:quantity="nbParticles"
				:ease="100"
				color="00E1FF"
				:staticity="25"
				refresh
			/>
		</ClientOnly>
		<HeaderComponent />
		<article
			v-auto-animate
			class="flex flex-col items-center w-full"
		>
			<div class="flex items-center justify-evenly mt-25 w-full">
				<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
				<h2 class="text-center">
					Create a free account
				</h2>
				<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF]">
			</div>
			<input
				id="usernameInput"
				v-model.lazy="username"
				class="h-15 w-4/5 md:w-2/5 placeholder:text-[#818181] p-5 text-lg text-[#F1F1F1] mt-25"
				type="text"
				name="username"
				placeholder="Username"
			>
			<p
				v-if="!diagnostics.usernameValid && username"
				class="formError w-4/5 md:w-2/5 mt-10 text-lg"
			>
				Username must be
				between 3 and 100 characters long.
			</p>
			<input
				id="emailInput"
				v-model.lazy="email"
				class="h-15 w-4/5 md:w-2/5 placeholder:text-[#818181] p-5 text-lg text-[#F1F1F1] mt-10"
				type="email"
				name="email"
				placeholder="E-Mail"
			>
			<p
				v-if="!diagnostics.emailValid && email"
				class="formError w-4/5 md:w-2/5 mt-10 text-lg"
			>
				Please enter a valid email
				address.
			</p>
			<p
				v-if="emailTaken"
				class="formError w-4/5 md:w-2/5 mt-10 text-lg"
			>
				{{ email }} is already taken.
			</p>
			<input
				id="passwordInput"
				v-model.lazy="password"
				class="h-15 w-4/5 md:w-2/5 placeholder:text-[#818181] p-5 text-lg text-[#F1F1F1] mt-10"
				type="password"
				name="password"
				placeholder="Password"
			>
			<p
				v-if="!diagnostics.passwordValid && password"
				class="formError w-4/5 md:w-2/5 mt-10 text-lg"
			>
				Password must be at
				least 6 characters long and include at least one number and one special character.
			</p>
			<input
				id="rPasswordInput"
				v-model.lazy="rPassword"
				class="h-15 w-4/5 md:w-2/5 placeholder:text-[#818181] p-5 text-lg text-[#F1F1F1] mt-10"
				type="password"
				name="rPassword"
				placeholder="Confirm Password"
			>
			<p
				v-if="!diagnostics.passwordRepeated && password && rPassword"
				class="formError w-4/5 md:w-2/5 mt-10 text-lg"
			>
				The
				passwords do not match.
			</p>
			<button
				id="submit"
				:disabled="!validData"
				class="h-15 w-4/5 md:w-2/5 text-[#F1F1F1] text-lg flex items-center justify-center mt-10"
				@click="createAccount"
			>
				<Icon
					name="mingcute:user-add-line"
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
			<p class="text-[#F1F1F1] text-lg text-center w-2/3 mt-25">
				By creating an account, you agree to SnapTix's Terms of Use and confirm that you are familiar with our
				<NuxtLink
					class="text-[#00E1FF] hover:text-[#736EFE]"
					to="/privacy-policy"
				>Privacy Policy</NuxtLink>.
			</p>
			<p class="text-[#F1F1F1] text-lg text-center w-2/3 mt-5">
				Already got an account ? <NuxtLink
					class="text-[#00E1FF] hover:text-[#736EFE]"
					to="/login"
				>Log-In
				</NuxtLink> instead.
			</p>
		</article>
		<FooterComponent />
	</div>
</template>

<style scoped>
h2 {
  background: linear-gradient(to right, #00E1FF, #736EFE);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  font-weight: 900;
  font-size: xx-large;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(0, 225, 255, 0.4);
}

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
  background: linear-gradient(135deg, rgba(0,225,255,0.5), rgba(115,110,254,0.5));
  border: 1px solid rgba(0, 225, 255, 0.7);
  box-shadow: 0 0 25px rgba(0,225,255,0.25);
  font-weight: 600;
  letter-spacing: 0.5px;
}

#submit:hover:not(:disabled) {
  border-color: #736EFE;
  box-shadow: 0 0 35px rgba(115,110,254,0.5),
              0 0 20px rgba(0,225,255,0.3);
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
  text-shadow: 0 0 4px rgba(0,0,0,0.4);
}
</style>
