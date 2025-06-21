import { defineConfig, loadEnv } from 'vite';

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	return {
		define: {
			__API_URL__: JSON.stringify(env.VITE_API_URL),
		},
		plugins: [
			react(),
			svgr({
				include: '**/*.svg',
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	};
});
