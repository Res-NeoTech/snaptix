export default defineEventHandler(() => {
	const seoQuotes: Array<string> = [
		'Fix text, code or content. Paste and go. No prompt needed.',
		'Your AI fixer. Just paste — SnapTix does the rest.',
		'AI that fixes anything — no prompt, no delay, no BS.',
		'SnapTix helps you fix code, text, and tasks without prompt engineering.',
		'Fix grammar, emails, and code instantly with AI — no prompt required.',
		'SnapTix is your AI tool to rewrite, correct, and improve any text in seconds.',
		'No prompt. No hassle. Just fixed.',
		'Paste. Fix. Done.',
	];
	const year: number = new Date().getFullYear();
	const seoQuote: string = seoQuotes[Math.floor(Math.random() * seoQuotes.length)];

	return {
		year,
		quote: seoQuote,
	};
});
