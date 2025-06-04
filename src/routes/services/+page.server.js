/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
	// ISR configuration for services page - content that updates occasionally
	isr: {
		expiration: 3600, // Regenerate every hour (3600 seconds)
		// Note: bypassToken should be added via environment variables for security
		allowQuery: ['category'] // Allow category query parameter for filtering
	}
}; 