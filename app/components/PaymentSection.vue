<template>
	<div class="glass-card p-6 max-w-3xl mx-auto">
		<h2 class="section-title">
			Payments
		</h2>

		<!-- Current Plan -->
		<div class="mt-6">
			<p class="text-[#F1F1F1]">
				Current Plan: <span class="font-semibold">Premium</span>
			</p>
			<p class="text-[#9BA1A6] text-sm">
				Next Payment: Feb 15, 2025
			</p>
		</div>

		<!-- Card Info -->
		<div class="mt-6 flex items-center justify-between p-4 rounded-lg border border-[#00E1FF]/40 bg-white/5">
			<div class="flex items-center gap-3">
				<Icon
					name="mdi:credit-card-outline"
					class="text-[#00E1FF] text-2xl"
				/>
				<span class="text-[#F1F1F1]">**** **** **** 4242</span>
			</div>
			<button class="btn-secondary">
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
  border: 1px solid #00E1FF;
  background-color: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(3px);
}
.section-title {
  background: linear-gradient(to right, #00E1FF, #736EFE);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  font-weight: 700;
}
.btn-secondary {
  border: 1px solid #4D4B4B;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 0.4rem 1rem;
  color: #F1F1F1;
  transition: 0.2s;
}
.btn-secondary:hover {
  border-color: #736EFE;
  cursor: pointer;
}
</style>
