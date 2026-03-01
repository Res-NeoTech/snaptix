<script setup lang="ts">
const { data } = await useAsyncData('dynamicData', () =>
	$fetch('/api/dynamic'),
);

const currentYear = new Date().getFullYear();
</script>

<template>
	<footer class="mt-25">
		<div class="footer-container">
			<!-- Top Section: Logo and Description -->
			<div class="footer-top">
				<div class="footer-brand">
					<div class="logo-container">
						<NuxtImg
							src="/snaptix.png"
							class="w-10 cursor-pointer"
							draggable="false"
							@click="navigateTo('/')"
						/>
						<span
							class="brand-name cursor-pointer"
							@click="navigateTo('/')"
						>SnapTix</span>
					</div>
					<p class="brand-description">
						{{ data?.quote }}
					</p>
				</div>

				<!-- Quick Links -->
				<div class="footer-links">
					<div class="link-group">
						<h3 class="link-title">
							APP
						</h3>
						<NuxtLink
							to="/"
							class="link"
						>Homepage</NuxtLink>
						<NuxtLink
							to="/dashboard"
							class="link"
						>Dashboard</NuxtLink>
						<NuxtLink
							to="/pricing"
							class="link"
						>Pricing</NuxtLink>
					</div>

					<div class="link-group">
						<h3 class="link-title">
							Company
						</h3>
						<NuxtLink
							to="/news"
							class="link"
						>News</NuxtLink>
					</div>

					<div class="link-group">
						<h3 class="link-title">
							Legal
						</h3>
						<NuxtLink
							to="/privacy-policy"
							class="link"
						>Privacy Policy</NuxtLink>
						<NuxtLink
							to="/terms-of-use"
							class="link"
						>Terms of Use</NuxtLink>
					</div>

					<!-- <div class="link-group">
						<h3 class="link-title">Follow us on</h3>
						<div class="social-links">
							<a href="#" class="social-link" aria-label="Instagram">
								<Icon name="mingcute:instagram-line" style="color: #F1F1F1" />
							</a>
							<a href="#" class="social-link" aria-label="Tik Tok">
								<Icon name="mingcute:tiktok-fill" style="color: #F1F1F1" />
							</a>
						</div>
					</div> -->
				</div>
			</div>

			<!-- Bottom Section: Copyright -->
			<div class="footer-bottom">
				<p class="copyright">
					&copy; 2025-{{ data?.year || currentYear }} SnapTix. All rights reserved.
				</p>
			</div>
		</div>
	</footer>
</template>

<style scoped>
footer {
	border-top: 2px solid transparent;
	border-image: linear-gradient(to right, #00E1FF, #736EFE);
	border-image-slice: 1;
	background: rgba(255, 255, 255, 0.06);
	backdrop-filter: blur(3px);
	box-shadow: 0 -4px 25px rgba(0, 225, 255, 0.08);
}

.footer-container {
	max-width: 1280px;
	margin: 0 auto;
	padding: 3rem 1.5rem 1.5rem;
}

/* Top Section */
.footer-top {
	display: grid;
	grid-template-columns: 1fr;
	gap: 3rem;
	padding-bottom: 2.5rem;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Brand Section */
.footer-brand {
	max-width: 350px;
}

.logo-container {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	margin-bottom: 1rem;
}

.logo {
	width: 40px;
	height: 40px;
	filter: drop-shadow(0 0 8px rgba(0, 225, 255, 0.3));
}

.brand-name {
	background: linear-gradient(to right, #00E1FF, #736EFE);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	font-weight: 700;
	font-size: x-large;
	text-shadow: 0 0 12px rgba(0, 225, 255, 0.6),
		0 0 20px rgba(115, 110, 254, 0.4);
	letter-spacing: 0.5px;
	transition: transform 0.2s ease;
}

.brand-name:hover {
	transform: scale(1.05);
}

.brand-description {
	color: #b8b8b8;
	font-size: 0.9rem;
	line-height: 1.6;
	margin: 0;
}

/* Links Section */
.footer-links {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	gap: 2rem;
}

.link-group {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.link-title {
	font-size: 0.875rem;
	font-weight: 600;
	color: #f1f1f1;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	margin: 0 0 0.5rem 0;
}

.link {
	color: #b8b8b8;
	font-size: 0.9rem;
	text-decoration: none;
	transition: all 0.3s ease;
	display: inline-block;
}

.link:hover {
	color: #00E1FF;
	transform: translateX(4px);
}

/* Social Links */
.social-links {
	display: flex;
	gap: 1rem;
	margin-top: 0.25rem;
}

.social-link {
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #b8b8b8;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 8px;
	transition: all 0.3s ease;
}

.social-link span {
	width: 24px;
	height: 24px;
}

.social-link:hover,
.social-link:hover span {
	color: #00E1FF;
	background: rgba(0, 225, 255, 0.519);
}

/* Bottom Section */
.footer-bottom {
	padding-top: 1.5rem;
	text-align: center;
}

.copyright {
	color: #8a8a8a;
	font-size: 0.875rem;
	margin: 0;
}

/* Responsive Design */
@media (min-width: 768px) {
	.footer-top {
		grid-template-columns: 1.2fr 2fr;
	}

	.footer-links {
		grid-template-columns: repeat(4, 1fr);
	}
}

@media (min-width: 1024px) {
	.footer-container {
		padding: 4rem 2rem 2rem;
	}
}

@media (max-width: 640px) {
	.footer-container {
		padding: 2rem 1rem 1rem;
	}

	.footer-top {
		gap: 2rem;
		padding-bottom: 2rem;
	}

	.footer-links {
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	.logo-container {
		gap: 0.5rem;
	}

	.logo {
		width: 32px;
		height: 32px;
	}

	.brand-name {
		font-size: 1.25rem;
	}
}
</style>
