export default defineNuxtRouteMiddleware(async (to) => {
	const auth = useAuth();

	if (!auth.value) {
		const { data: user } = await useFetch<{ userId: string; email: string }>('/api/auth/verify', { credentials: 'include' });
		auth.value = user.value;
	}

	if (auth.value && (to.path === '/login' || to.path === '/signup')) return navigateTo('/dashboard', { redirectCode: 301 });
	if (!auth.value && to.path.startsWith('/dashboard')) return navigateTo('/login', { redirectCode: 301 });

	if (auth.value && to.path === '/subscription-success') {
		umTrackRevenue('subscription-success', 3, 'USD');
	}
});
