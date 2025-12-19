export default defineEventHandler((event) => {
	if (event.node.req.url === '/api/stripe/webhook') {
		event.node.req.setEncoding('utf8');
	}
});
