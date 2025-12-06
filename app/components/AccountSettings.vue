<script setup lang="ts">
import { ref, computed } from 'vue';
import { validatePassword } from '~~/lib/utils/validators';

interface User {
	id: string;
	username: string;
	email: string;
	joinDate: string;
	isPremium: boolean;
}

const props = defineProps<{ user: User }>();

// Form Values
const username = ref<string>(props.user.username);
const password = ref<string>('');
const rPassword = ref<string>('');
const cPassword = ref<string>('');

const signButtonText = ref<string>('Save Changes');
const serverSideError = ref<boolean>(false);
const wrongPassword = ref<boolean>(false);
const successfullModification = ref<boolean>(false);

const diagnostics = ref({
	usernameValid: true,
	passwordValid: false,
	passwordRepeated: false,
});

let debounceTimer: NodeJS.Timeout;

watch([username, password, rPassword], () => {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(() => {
		diagnostics.value = {
			usernameValid: username.value.length > 3 && username.value.length <= 100,
			passwordValid: validatePassword(password.value),
			passwordRepeated: password.value === rPassword.value,
		};
	}, 200);
});

const validData = computed<boolean>(() => {
	const { usernameValid, passwordValid, passwordRepeated } = diagnostics.value;

	const usernameChanged = username.value !== props.user.username;
	const newPasswordEntered = password.value.length > 0;

	// must always provide current password
	const hasCurrentPassword = cPassword.value.length > 0;

	// if password entered → must be valid and repeated correctly
	const passwordOk = !newPasswordEntered || (passwordValid && passwordRepeated);

	// user must change *something*
	const somethingChanged = usernameChanged || newPasswordEntered;

	return hasCurrentPassword && somethingChanged && usernameValid && passwordOk;
});

const editAccount = async () => {
	signButtonText.value = 'Saving Changes...';
	serverSideError.value = false;
	wrongPassword.value = false;
	successfullModification.value = false;

	await useFetch('/api/account/edit', {
		method: 'PUT',
		body: {
			newUsername: username,
			password: cPassword,
			newPassword: password,
		},
		onResponse({ response }) {
			if (response.status === 204) {
				successfullModification.value = true;
			}
		},
		onResponseError({ response }) {
			if (response.status === 403) {
				wrongPassword.value = true;
			}
			else {
				serverSideError.value = true;
			}
		},
	});

	signButtonText.value = 'Save Changes';
};
</script>

<template>
	<div class="glass-card p-6 max-w-4xl mx-auto">
		<h2 class="section-title">
			Account Settings
		</h2>

		<form
			v-auto-animate
			class="flex flex-col gap-5 mt-6"
		>
			<input
				v-model="username"
				type="text"
				placeholder="Change Username"
				class="h-15 placeholder:text-[#818181] p-5 text-lg text-[#F1F1F1]"
			>
			<p
				v-if="!diagnostics.usernameValid"
				class="formError text-lg"
			>
				Username must be
				between 3 and 100 characters long.
			</p>
			<input
				v-model="password"
				type="password"
				placeholder="New Password"
				class="h-15 placeholder:text-[#818181] p-5 text-lg text-[#F1F1F1]"
			>
			<p
				v-if="!diagnostics.passwordValid && password"
				class="formError text-lg"
			>
				Password must be at
				least 6 characters long and include at least one number and one special character.
			</p>
			<input
				v-model="rPassword"
				type="password"
				placeholder="Confirm New Password"
				class="h-15 placeholder:text-[#818181] p-5 text-lg text-[#F1F1F1]"
			>
			<p
				v-if="!diagnostics.passwordRepeated && password && rPassword"
				class="formError text-lg"
			>
				The
				passwords do not match.
			</p>
			<h3 class="text-xl font-bold text-[#F1F1F1]">
				Making sure it's you
			</h3>
			<input
				v-model="cPassword"
				type="password"
				placeholder="Your current password"
				class="h-15 placeholder:text-[#818181] p-5 text-lg text-[#F1F1F1]"
			>
			<p
				v-if="wrongPassword"
				class="formError text-lg"
			>
				Incorrect password. Please try again.
			</p>
			<button
				type="button"
				:disabled="!validData"
				class="btn-primary px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15"
				@click="editAccount"
			>
				<Icon
					name="mingcute:save-2-fill"
					style="color: #F1F1F1"
					class="mr-2"
				/>
				{{ signButtonText }}
			</button>
			<p
				v-if="serverSideError"
				class="formError text-lg"
			>
				Something unexpected happened. Please, try again later.
			</p>
			<p
				v-if="successfullModification"
				class="formSuccess text-lg"
			>
				Successfully saved changes!
			</p>
		</form>
	</div>
</template>

<style scoped>
.glass-card {
	border-radius: 15px;
	backdrop-filter: blur(3px);
	background: rgba(255, 255, 255, 0.06);
	border: 1px solid rgba(255, 255, 255, 0.15);
	transition: all 0.3s ease;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.glass-card:hover {
	border-color: #736EFE;
	background: rgba(0, 225, 255, 0.12);
	box-shadow: 0 6px 25px rgba(115, 110, 254, 0.4);
}

.section-title {
	background: linear-gradient(to right, #00E1FF, #736EFE);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	display: inline-block;
	font-weight: 900;
	font-size: 1.5rem;
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
	border-radius: 18px;
	backdrop-filter: blur(8px);
	transition: all 0.3s ease;
	font-weight: 600;
	letter-spacing: 0.3px;
}

button:disabled {
	background: rgba(1, 171, 194, 0.3);
	border: 1px solid rgba(1, 189, 214, 0.6);
	box-shadow: none;
	cursor: not-allowed;
}

button:disabled:hover {
	box-shadow: none;
	cursor: not-allowed;
	border: 1px solid rgba(1, 189, 214, 0.6);
}

button:hover {
	cursor: pointer;
	transform: translateY(-2px);
}

.btn-primary {
	background: linear-gradient(135deg, rgba(0, 225, 255, 0.5), rgba(115, 110, 254, 0.5));
	border: 1px solid rgba(0, 225, 255, 0.7);
	box-shadow: 0 0 18px rgba(0, 225, 255, 0.25);
}

.btn-primary:hover {
	border-color: #736EFE;
	box-shadow: 0 0 28px rgba(115, 110, 254, 0.5),
		0 0 16px rgba(0, 225, 255, 0.3);
}

.formError {
	color: #ff4d6d;
	text-align: left;
	margin-left: 10px;
	font-weight: 500;
	text-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
}

.formSuccess {
	color: aquamarine;
	text-align: left;
	margin-left: 10px;
	font-weight: 500;
	text-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
}
</style>
