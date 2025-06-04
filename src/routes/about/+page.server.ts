import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
	// ISR configuration for about page - semi-static content
	isr: {
		expiration: 7200, // Regenerate every 2 hours (7200 seconds)
		// About page content changes less frequently than services
	}
}; 