<template>
	<div class="glass-card p-6 max-w-3xl mx-auto">
		<h2 class="section-title">
			Account Settings
		</h2>

		<form class="flex flex-col gap-5 mt-6">
			<input
				type="text"
				placeholder="Change Username"
				class="input"
			>
			<input
				type="email"
				placeholder="Change Email"
				class="input"
			>
			<input
				type="password"
				placeholder="New Password"
				class="input"
			>
			<input
				type="password"
				placeholder="Confirm Password"
				class="input"
			>

			<button
				type="submit"
				class="btn-primary self-start"
			>
				Save Changes
			</button>
		</form>
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
.input {
  border-radius: 12px;
  border: 1px solid #00E1FF;
  background-color: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(3px);
  padding: 0.75rem 1rem;
  color: #F1F1F1;
}
.input:focus {
  outline: none;
  border-color: #736EFE;
}
.btn-primary {
  background-color: rgba(0, 225, 255, 0.5);
  border: 1px solid #00E1FF;
  border-radius: 12px;
  padding: 0.5rem 1.25rem;
  color: #F1F1F1;
  transition: 0.2s;
}
.btn-primary:hover {
  border-color: #736EFE;
  background-color: #736efe8c;
  cursor: pointer;
}
</style>
