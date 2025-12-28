import tailwindcss from '@tailwindcss/vite';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/image', '@nuxt/icon', '@formkit/auto-animate', '@pinia/nuxt', 'nuxt-umami'],
	devtools: { enabled: true },
	app: {
		head: {
			title: 'SnapTix',
			htmlAttrs: {
				lang: 'en',
			},
			meta: [
				{ name: 'description', content: 'SnapTix is an application to fix grammar, emails, and code instantly with AI — no prompt required.' },
			],
		},
	},
	css: ['~/assets/css/main.css'],
	runtimeConfig: {
		public: {},
		MONGO_URI: process.env.MONGO_URI || 'mongodb://admin:admin@localhost:27017/snaptix',
		stripeSecret: process.env.STRIPE_SECRET_KEY,
		stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
		stripePriceIdPremium: process.env.STRIPE_PREMIUM_PRICE_ID,
	},
	compatibilityDate: '2025-07-15',
	nitro: {
		preset: 'node-server',
	},
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
			},
		},
	},
	umami: {
		id: 'f9571e1d-cc0e-4dd2-9f7c-56b954e598dd',
		host: 'https://umami.maksym.ch',
		autoTrack: true,
		// enabled: false,
		// useDirective: true,
		ignoreLocalhost: true,
		// domains: ['cool-site.app', 'my-space.site'],
		// urlOptions: {
		//   trailingSlash: 'always',
		//   excludeSearch: false,
		//   excludeHash: false,
		// },
		// proxy: 'cloak',
		// logErrors: true,
		// customEndpoint: '/my-custom-endpoint',
		// tag: 'website-variation-123',
	},
});
