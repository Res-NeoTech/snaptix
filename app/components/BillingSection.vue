<script setup lang="ts">
// Necessary types
import type BillingInfo from '~~/lib/interfaces/billing';
import type User from '~~/lib/interfaces/user';

const openBillingPortal = async () => {
	const { url } = await $fetch<{ url: string }>('/api/stripe/billing/portal', {
		method: 'POST',
	});

	window.location.href = url;
};

defineProps<{ user: User | undefined; billing: BillingInfo | undefined }>();
</script>

<template>
	<div
		v-if="billing?.invoices.length"
		class="glass-card p-6 max-w-4xl mx-auto"
	>
		<h2 class="section-title">
			Billing
		</h2>
		<!-- Current Plan -->
		<div class="mt-6">
			<p class="text-[#F1F1F1] flex items-center">
				Current Plan: {{ user?.isPremium ? "Premium" : "Free" }}
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
			<p
				v-if="user?.isPremium"
				class="text-[#9BA1A6] text-sm"
			>
				Next Payment: {{ billing?.nextPayment }}
			</p>
		</div>

		<!-- Card Info -->
		<div
			class="card-box mt-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between p-4 rounded-lg border border-[#00E1FF]/40 bg-white/5"
		>
			<div class="flex items-center gap-3">
				<Icon
					name="mingcute:bank-card-fill"
					style="color: #F1F1F1"
					class="text-2xl"
				/>
				<span class="text-[#F1F1F1]">**** **** **** {{ billing?.cardLast4 }}</span>
			</div>
			<UTooltip text="Open billing portal">
				<button
					class="btn-primary hover:cursor-pointer w-full sm:w-auto flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-12"
					@click="openBillingPortal"
				>
					<Icon
						name="mingcute:settings-3-fill"
						style="color: #F1F1F1"
						class="mr-2"
					/>
					Billing Portal
				</button>
			</UTooltip>
		</div>

		<!-- Payment History -->
		<div class="p-6 mt-6">
			<h3 class="mb-4 text-[#F1F1F1]">
				Recent Payments
			</h3>

			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="text-[#9BA1A6] border-b border-white/10">
							<th class="py-3 text-left font-medium pl-2">
								Date
							</th>
							<th class="py-3 text-left font-medium">
								Status
							</th>
							<th class="py-3 text-right font-medium">
								Amount
							</th>
							<th class="py-3 text-right font-medium">
								Invoice
							</th>
						</tr>
					</thead>

					<tbody>
						<tr
							v-for="invoice in billing?.invoices"
							:key="invoice.id"
							class="border-b border-white/5 hover:bg-white/5 transition"
						>
							<td class="py-3 text-[#F1F1F1] pl-2">
								{{ invoice.date }}
							</td>

							<td class="py-3">
								<span
									:class="[
										'px-3 py-1 rounded-full text-xs font-semibold',
										invoice.status === 'PAID'
											? 'text-[#00E1FF] bg-[#00E1FF]/10'
											: 'text-yellow-400 bg-yellow-400/10',
									]"
								>
									{{ invoice.status }}
								</span>
							</td>

							<td class="py-3 text-right font-semibold text-[#F1F1F1]">
								${{ invoice.amount.toFixed(2) }}
							</td>

							<td class="py-3 text-right pr-2 text-[#00E1FF] hover:text-[#736EFE] cursor-pointer">
								<UTooltip
									text="Download PDF"
									:content="{
										align: 'center',
										side: 'right',
									}"
								>
									<NuxtLink
										v-if="invoice.pdfUrl"
										:to="invoice.pdfUrl"
										download
									>PDF</NuxtLink>
								</UTooltip>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div
		v-else
		class="glass-card p-6 max-w-4xl mx-auto"
	>
		<h2 class="section-title">
			Payments
		</h2>
		<div class="mt-6">
			<p class="text-[#F1F1F1] flex items-center">
				You don't have any billing history yet.
			</p>
			<p class="text-[#9BA1A6] text-sm">
				If that's not the case, please wait a moment until we update your status.
			</p>
		</div>
		<button
			class="btn-primary mt-6 hover:cursor-pointer flex-1 w-full sm:flex-none px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-12"
			@click="navigateTo('/pricing')"
		>
			<Icon
				name="solar:tag-price-bold"
				style="color: #F1F1F1"
				class="mr-2"
			/>
			See pricing
		</button>
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
