/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
	// Use edge runtime for simple API endpoints for better performance
	runtime: 'edge'
};

export async function GET() {
	return new Response(JSON.stringify({
		status: 'healthy',
		timestamp: new Date().toISOString(),
		service: 'Scotia Performance'
	}), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'public, max-age=60' // Cache for 1 minute
		}
	});
} 