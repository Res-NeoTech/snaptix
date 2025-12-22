<script setup lang="ts">
import AnimatedCircularProgressBar from './imported/AnimatedCircularProgressBar.vue';
import type User from '~~/lib/interfaces/user';

defineProps<{ user: User }>();

const logout = async () => {
	await useFetch(() => `/api/account/logout`, {
		method: 'POST',
		async onResponse() {
			reloadNuxtApp();
		},
	});
};
</script>

<template>
	<div class="glass-card p-6 max-w-4xl mx-auto">
		<h2 class="section-title">
			Overview
		</h2>

		<div class="flex flex-col md:flex-row items-center md:items-start gap-6 mt-6">
			<!-- Avatar -->
			<div
				class="w-24 h-24 rounded-full bg-[#00E1FF]/30 flex items-center justify-center border border-[#00E1FF]"
			>
				<Icon
					name="bx:user"
					class="text-4xl text-[#00E1FF]"
				/>
			</div>

			<!-- User Info -->
			<div class="flex-1 text-center md:text-left">
				<h3 class="text-xl font-bold text-[#F1F1F1]">
					{{ user.username }}
				</h3>
				<p class="text-[#9BA1A6] mt-5">
					{{ user.email }}
				</p>
				<p class="text-[#9BA1A6] mt-2">
					USERID: {{ user.id }}
				</p>
				<hr class="mt-5 text-[#9BA1A6]">
				<p class="mt-5 text-[#F1F1F1] flex items-center">
					Subscription: {{ user.isPremium ? "Premium" : "Free" }}
					<Icon
						v-if="user?.isPremium"
						name="material-symbols:crown-rounded"
						style="color: #F1F1F1"
						class="mx-1"
					/>
					<Icon
						v-else
						name="ic:round-money-off"
						style="color: #F1F1F1"
						class="mx-1"
					/>
				</p>
				<p class="mt-2 text-[#F1F1F1] flex items-center">
					User since: {{ user.joinDate }}
				</p>
				<hr class="mt-5 text-[#9BA1A6]">
				<div class="flex justify-evenly items-center mt-10">
					<h3 class="text-xl font-bold text-[#F1F1F1]">
						Today's Usage:
					</h3>
					<AnimatedCircularProgressBar
						:gauge-primary-color="'#736EFE'"
						:max="user.correctionLimit"
						:min="0"
						:value="user.correctionCount"
					/>
				</div>
				<hr
					v-if="user.correctionQuotaReset !== 'NONE'"
					class="mt-10 text-[#9BA1A6]"
				>
				<p
					v-if="user.correctionQuotaReset !== 'NONE'"
					class="mt-5 text-[#F1F1F1] flex items-center"
				>
					Your limit resets in {{ user.correctionQuotaReset }}.
				</p>
			</div>

			<!-- Log Out Button -->
			<button
				class="btn-primary flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] mx-5 text-lg flex items-center justify-center h-15"
				@click="logout"
			>
				<Icon
					name="mingcute:exit-fill"
					style="color: #F1F1F1"
					class="mr-2"
				/>Log Out
			</button>
		</div>
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
</style>
