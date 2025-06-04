import type { LayoutServerLoad } from './$types';

// Following Vercel best practices for environment variables
// Using $env/static/private for better optimization (dead code elimination)

export const load: LayoutServerLoad = async () => {
	// Example: You can access Vercel deployment info here
	// Uncomment and use these when needed:
	
	// import { VERCEL_ENV, VERCEL_URL, VERCEL_COMMIT_REF } from '$env/static/private';
	
	return {
		// Example of exposing deployment info to client (if needed)
		// environment: VERCEL_ENV,
		// deploymentUrl: VERCEL_URL,
		// gitBranch: VERCEL_COMMIT_REF
	};
}; 