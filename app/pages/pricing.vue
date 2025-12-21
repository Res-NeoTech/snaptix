<script setup lang="ts">
import ParticlesBg from '../components/imported/ParticlesBg.vue';
import DropDown from '~/components/DropDown.vue';

useHead({
  title: 'Pricing | SnapTix',
  meta: [
    { name: 'description', content: 'See SnapTix pricing and choose a simple AI plan to fix code, text, and content instantly. No prompt engineering. Cancel anytime.' },
  ]
});

const nbParticles = ref<number>(Math.round(200 + Math.random() * 50));

interface User {
	id: string;
	username: string;
	email: string;
	joinDate: string;
	isPremium: boolean;
	correctionLimit: number;
	correctionCount: number;
	correctionQuotaReset: string;
}

const getPremium = async () => {
	try {
		const { url } = await $fetch<{ url: string }>('/api/stripe/create-checkout-session', {
			method: 'POST',
		});

		window.location.href = url;
	}
	catch (err: any) {
		if (err.status === 401 || err.status === 404) {
			navigateTo('/login');
		}
	}
};

const openBillingPortal = async () => {
	const { url } = await $fetch<{ url: string }>('/api/stripe/billing/portal', {
		method: 'POST',
	});

	window.location.href = url;
};

const { data: userDetails } = await useAsyncData<User>(
	'userDetails',
	() => $fetch('/api/account/info', {
		headers: useRequestHeaders(['cookie']),
	}),
);
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
		<div class="flex items-center justify-evenly mt-25 px-4">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF] hidden md:block">
			<h2 class="text-center">
				Pricing
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF] hidden md:block">
		</div>

		<div
			class="flex flex-col lg:flex-row items-stretch lg:items-center justify-center mt-25 gap-36 px-4 lg:px-8 pb-16"
		>
			<div class="glass-card p-6 md:p-8 w-full lg:w-1/4 xl:w-1/5 relative">
				<h2 class="section-title text-center w-full mt-5">
					Free
				</h2>
				<hr class="border-t-3 w-4/5 mx-auto rounded-xs b-[#00E1FF] mt-10 mb-10 text-[#00E1FF]">
				<p>
					Perfect if you want to try things out without committing.
					You get the essentials, clean and simple — no pressure, no paywall trap.
				</p>
				<h3 class="text-center w-full mb-5">
					Includes:
				</h3>
				<ul class="flex flex-col justify-center space-y-3 mb-8">
					<li class="flex items-center">
						<Icon
							name="mingcute:flash-fill"
							style="color: #F1F1F1"
							class="mr-2 flex-shrink-0"
						/>Core
						features to get you started
					</li>
					<li class="flex items-center">
						<Icon
							name="mingcute:scale-fill"
							style="color: #F1F1F1"
							class="mr-2 flex-shrink-0"
						/>15
						corrections per day
					</li>
					<li class="flex items-center">
						<Icon
							name="mingcute:bulb-2-fill"
							style="color: #F1F1F1"
							class="mr-2 flex-shrink-0"
						/>Basic AI
						Model
					</li>
					<li class="flex items-center">
						<Icon
							name="mingcute:group-2-fill"
							style="color: #F1F1F1"
							class="mr-2 flex-shrink-0"
						/>Standard
						support
					</li>
					<li class="flex items-center">
						<Icon
							name="mingcute:unlock-fill"
							style="color: #F1F1F1"
							class="mr-2 flex-shrink-0"
						/>More
						features to come
					</li>
				</ul>
				<h3 class="text-center w-full mb-5">
					Ideal for:
				</h3>
				<p class="mb-8">
					People testing the waters, building an MVP, or just figuring out if SnapTix fits their
					workflow.
				</p>
				<button
					v-if="userDetails?.isPremium"
					class="btn-primary w-full flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15 mt-auto"
					@click="openBillingPortal"
				>
					<Icon
						name="solar:tag-price-bold"
						style="color: #F1F1F1"
						class="mr-2"
					/>Free
				</button>
				<button
					v-else-if="userDetails && !userDetails?.isPremium"
					class="w-full flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15 mt-auto"
				>
					Your current plan
				</button>
				<button
					v-else
					class="btn-primary w-full flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15 mt-auto"
				>
					<Icon
						name="solar:tag-price-bold"
						style="color: #F1F1F1"
						class="mr-2"
					/>Free
				</button>
			</div>

			<div class="glass-card-premium p-6 md:p-8 w-full lg:w-1/4 xl:w-1/5 relative premium-glow">
				<div class="premium-badge">
					<span>Best Choice</span>
				</div>
				<h2 class="section-title text-center w-full mt-5">
					Premium
				</h2>
				<hr class="border-t-3 w-4/5 mx-auto rounded-xs b-[#00E1FF] mt-10 mb-10 text-[#00E1FF]">
				<p>
					Unlock the full potential of SnapTix with higher limits, faster processing, and priority access to
					our advanced AI engine.
				</p>
				<h3 class="text-center w-full mb-5">
					Includes:
				</h3>
				<ul class="flex flex-col justify-center space-y-3 mb-8">
					<li class="flex items-center">
						<Icon
							name="mingcute:flash-fill"
							style="color: #F1F1F1"
							class="mr-2 flex-shrink-0"
						/>Full access
						to every feature
					</li>
					<li class="flex items-center">
						<Icon
							name="mingcute:scale-fill"
							style="color: #F1F1F1"
							class="mr-2 flex-shrink-0"
						/>50
						corrections per day
					</li>
					<li class="flex items-center">
						<Icon
							name="mingcute:bulb-2-fill"
							style="color: #F1F1F1"
							class="mr-2 flex-shrink-0"
						/>Advanced
						AI Model
					</li>
					<li class="flex items-center">
						<Icon
							name="mingcute:group-2-fill"
							style="color: #F1F1F1"
							class="mr-2 flex-shrink-0"
						/>Priority
						Support
					</li>
					<li class="flex items-center">
						<Icon
							name="mingcute:unlock-fill"
							style="color: #F1F1F1"
							class="mr-2 flex-shrink-0"
						/>More
						features to come
					</li>
				</ul>
				<h3 class="text-center w-full mb-5">
					Perfect for:
				</h3>
				<p class="mb-8">
					Users who rely on SnapTix daily, need more consistent output, or want the best possible
					accuracy and speed.
				</p>
				<button
					v-if="userDetails?.isPremium"
					class="w-full flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15 mt-auto"
					@click="getPremium"
				>
					Your current plan
				</button>
				<button
					v-else
					class="btn-premium w-full flex-1 sm:flex-none px-4 py-2 text-[#F1F1F1] text-lg flex items-center justify-center h-15 mt-auto"
					@click="getPremium"
				>
					<Icon
						name="solar:tag-price-bold"
						style="color: #F1F1F1"
						class="mr-2"
					/>3.00 &dollar;
				</button>
			</div>
		</div>

		<div class="flex items-center justify-evenly mt-25 px-4">
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF] hidden md:block">
			<h2 class="text-center">
				FAQ
			</h2>
			<hr class="w-1/5 border-t-3 rounded-xs b-[#00E1FF] text-[#00E1FF] hidden md:block">
		</div>

		<div class="flex flex-col items-center w-full mt-25">
			<DropDown
				title="How do you handle payments?"
				content="We use **Stripe** to securely process all payments. We never store your card details on our servers — everything is handled directly by Stripe.
For more information, please refer to the [Stripe Privacy Policy](https://stripe.com/privacy)."
				custom-class="w-3/4 lg:w-1/2"
			/>
			<DropDown
				title="Can I use Premium on multiple devices?"
				content="Yes. Your **SnapTix Premium** subscription is linked to your account, not a specific device.
                You can access Premium features from any device as long as you’re logged into your account."
				custom-class="w-3/4 lg:w-1/2"
			/>
			<DropDown
				title="Do you offer a free trial?"
				content="Currently, **SnapTix Premium** does not include a free trial.
                That said, we’re actively listening to user feedback, and this may change in the future."
				custom-class="w-3/4 lg:w-1/2"
			/>
			<DropDown
				title="Will the price change in the future?"
				content="**SnapTix** is a young and actively evolving application. As we introduce new features and improvements, the pricing may change in the future.
                If that happens, we will always notify you in advance, so you can decide whether you want to keep your plan or make a change — no surprises."
				custom-class="w-3/4 lg:w-1/2"
			/>
			<DropDown
				title="What if my payment fails?"
				content="If a payment fails, Stripe will automatically attempt to retry it.
                If the issue persists, your Premium access may be paused until the payment is resolved. You can always update your payment method through the billing portal."
				custom-class="w-3/4 lg:w-1/2"
			/>
			<DropDown
				title="I subscribed, but my status hasn't been updated"
				content="This can happen — no worries 🙂
Sometimes it takes a short moment for Stripe to confirm the payment and for our system to sync your subscription status.

If it feels like it's taking unusually long, feel free to contact [our support](mailto:support@snaptix.com), and we’ll take a look."
				custom-class="w-3/4 lg:w-1/2"
			/>
			<DropDown
				title="What happens when I cancel my plan?"
				content="If you cancel your subscription, you will keep **Premium** access until the end of your current billing period.

This means you can continue enjoying all premium features until the next payment date — cancellation simply prevents the next charge."
				custom-class="w-3/4 lg:w-1/2"
			/>
			<DropDown
				title="Can I get a refund?"
				content="At the moment, we don’t offer automatic refunds.
However, if something went wrong or you believe you were charged by mistake, please contact [our support](mailto:support@snaptix.com).

We review refund requests on a case-by-case basis and always try to be fair."
				custom-class="w-3/4 lg:w-1/2"
			/>
		</div>

		<FooterComponent :margin="true" />
	</div>
</template>

<style scoped>
h2,
h3 {
    background: linear-gradient(to right, #00E1FF, #736EFE);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    font-weight: 900;
    font-size: xx-large;
    letter-spacing: 1px;
}

h3 {
    color: #F1F1F1;
    font-weight: 600;
    font-size: large;
}

.glass-card {
    border-radius: 20px;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    min-height: 600px;
}

.glass-card:hover {
    border-color: rgba(0, 225, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 12px 40px rgba(0, 225, 255, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.15);
    transform: translateY(-8px);
}

.glass-card-premium {
    border-radius: 20px;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    background: linear-gradient(135deg,
            rgba(0, 225, 255, 0.12) 0%,
            rgba(115, 110, 254, 0.12) 100%);
    border: 2px solid rgba(0, 225, 255, 0.5);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 12px 48px rgba(0, 225, 255, 0.25),
        0 0 0 1px rgba(115, 110, 254, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    min-height: 600px;
    position: relative;
    z-index: 10;
}

.glass-card-premium:hover {
    background: linear-gradient(135deg,
            rgba(0, 225, 255, 0.18) 0%,
            rgba(115, 110, 254, 0.18) 100%);
    border-color: rgba(115, 110, 254, 0.6);
    box-shadow: 0 16px 64px rgba(0, 225, 255, 0.4),
        0 0 0 2px rgba(115, 110, 254, 0.5),
        inset 0 2px 0 rgba(255, 255, 255, 0.25),
        0 0 80px rgba(115, 110, 254, 0.3);
    transform: translateY(-8px);
}

.premium-glow {
    position: relative;
}

.premium-glow::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(135deg, #00E1FF, #736EFE);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.6;
    animation: borderGlow 3s ease-in-out infinite;
    pointer-events: none;
}

@keyframes borderGlow {

    0%,
    100% {
        opacity: 0.6;
    }

    50% {
        opacity: 1;
    }
}

.premium-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #00E1FF, #736EFE);
    padding: 6px 20px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #0D1117;
    box-shadow: 0 4px 16px rgba(0, 225, 255, 0.4);
    z-index: 20;
    white-space: nowrap;
}

.section-title {
    background: linear-gradient(to right, #00E1FF, #736EFE);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    font-weight: 900;
    font-size: 2rem;
    letter-spacing: 1px;
}

button {
    border-radius: 18px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: all 0.3s ease;
    font-weight: 600;
    letter-spacing: 0.3px;
}

button:hover {
    cursor: pointer;
    transform: translateY(-2px);
}

.btn-primary {
    background: linear-gradient(135deg, rgba(0, 225, 255, 0.3), rgba(115, 110, 254, 0.3));
    border: 1px solid rgba(0, 225, 255, 0.5);
    box-shadow: 0 0 18px rgba(0, 225, 255, 0.2);
}

.btn-primary:hover {

    border-color: #736EFE;
    background: linear-gradient(135deg, rgba(0, 225, 255, 0.4), rgba(115, 110, 254, 0.4));
    box-shadow: 0 0 28px rgba(115, 110, 254, 0.4),
        0 0 16px rgba(0, 225, 255, 0.25);
}

.btn-premium {
    background: linear-gradient(135deg, #00E1FF, #736EFE);
    border: none;
    box-shadow: 0 0 24px rgba(0, 225, 255, 0.4),
        0 4px 16px rgba(115, 110, 254, 0.3);
    font-weight: 700;
    position: relative;
    overflow: hidden;
}

.btn-premium::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent);
    transition: left 0.5s;
}

.btn-premium:hover::before {
    left: 100%;
}

.btn-premium:hover {
    box-shadow: 0 0 40px rgba(0, 225, 255, 0.6),
        0 6px 24px rgba(115, 110, 254, 0.5);
    transform: translateY(-4px);
}

.separator {
    margin-bottom: 50px;
}

li {
    text-align: left;
    list-style-type: none;
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

/* Responsive adjustments */

@media (max-width: 1023px) {
    h2 {
        font-size: x-large;
    }

    .section-title {
        font-size: 1.75rem;
    }

    .glass-card,
    .glass-card-premium {
        min-height: auto;
    }
}

@media (max-width: 640px) {
    h2 {
        font-size: large;
    }

    .section-title {
        font-size: 1.5rem;
    }

    p,
    li {
        font-size: medium;
    }
}
</style>
