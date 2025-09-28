import tailwindcss from '@tailwindcss/vite';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/image', '@nuxt/icon', '@formkit/auto-animate'],
	devtools: { enabled: true },
	app: {
		head: {
			title: 'SnapTix',
			htmlAttrs: {
				lang: 'en',
			},
			meta: [
				{ name: 'description', content: 'Fix grammar, emails, and code instantly with AI — no prompt required.' },
			],
		},
	},
	css: ['~/assets/css/main.css'],
	compatibilityDate: '2025-07-15',
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
	runtimeConfig: {
    public: {},
    MONGO_URI: process.env.MONGO_URI || "mongodb://admin:admin@localhost:27017/snaptix",
  }
});