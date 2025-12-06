<script setup lang="ts">
interface User {
	id: string;
	username: string;
	email: string;
	joinDate: string;
	isPremium: boolean;
}

defineProps<{ user: User }>();
</script>

<template>
	<div class="glass-card p-6 max-w-4xl mx-auto">
		<h2 class="section-title">
			Payments
		</h2>
		<!-- Current Plan -->
		<div class="mt-6">
			<p class="text-[#F1F1F1] flex items-center">
				Current Plan: {{ user.isPremium ? "Premium" : "Free" }}
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
			<p class="text-[#9BA1A6] text-sm">
				Next Payment: Feb 15, 2025
			</p>
		</div>

		<!-- Card Info -->
		<div class="card-box mt-6 flex items-center justify-between p-4 rounded-lg border border-[#00E1FF]/40 bg-white/5">
			<div class="flex items-center gap-3">
				<Icon
					name="mingcute:bank-card-fill"
					class="text-[#00E1FF] text-2xl"
				/>
				<span class="text-[#F1F1F1]">**** **** **** 4242</span>
			</div>
			<button
				class="btn-primary hover:cursor-pointer flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-12"
			>
				<Icon
					name="mingcute:settings-3-fill"
					class="mr-2"
				/>
				Change Card
			</button>
		</div>

		<!-- Payment History -->
		<div class="mt-6">
			<h3 class="text-[#F1F1F1] mb-3">
				Recent Payments
			</h3>
			<ul class="flex flex-col gap-2 text-sm text-[#9BA1A6]">
				<li class="flex justify-between">
					<span>Jan 15, 2025</span><span>$3.00</span>
				</li>
				<li class="flex justify-between">
					<span>Dec 15, 2024</span><span>$3.00</span>
				</li>
				<li class="flex justify-between">
					<span>Nov 15, 2024</span><span>$3.00</span>
				</li>
			</ul>
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

.card-box {
	border-radius: 20px;
	border: 1px solid rgba(255, 255, 255, 0.25);
	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(12px);
	box-shadow: inset 0 0 15px rgba(0, 225, 255, 0.05),
		0 0 12px rgba(0, 225, 255, 0.08);
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

button {
	border-radius: 18px;
	backdrop-filter: blur(8px);
	transition: all 0.3s ease;
	font-weight: 600;
	letter-spacing: 0.3px;
}
</style>
