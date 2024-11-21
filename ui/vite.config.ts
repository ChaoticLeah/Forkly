import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		host: 'localhost',
		port: 5173,
		proxy: {
			'/api': {
				target: 'http://localhost:9080',
				changeOrigin: true,
				secure: false
			}
		},
		watch: {
			// Refresh the browser on changes
			usePolling: true
		}
	}
});
