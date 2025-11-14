export default defineEventHandler(async (event) => {
	const MISTRAL_API_URL = 'https://api.mistral.ai/v1/agents/completions';
	const API_KEY = process.env.MISTRAL_API_KEY;

	const body = await readBody(event);
	const prompt: string = body.prompt;
	
	const fixRequest = await fetch(MISTRAL_API_URL, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			agent_id: 'ag:85f5a2fd:20250806:snaptix-preview:269a3576',
			stream: false,
			messages: [
				{
					role: 'user',
					content: prompt,
				},
			],
		}),
	});

	if (fixRequest.ok) {
		const data = await fixRequest.json();
		const response = data.choices[0].message.content;
		return { response };
	}
	else {
		const text = await fixRequest.text();
		console.error(`Mistral API error ${fixRequest.status}: ${text}`);
		setResponseStatus(event, 500);
		return { error: `API error: ${fixRequest.status} - ${text}` };
	}
});
