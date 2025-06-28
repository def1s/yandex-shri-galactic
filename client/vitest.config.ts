import { defineConfig } from 'vitest/config';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		css: {
			modules: {
				classNameStrategy: 'non-scoped',
			},
		},
		include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	plugins: [
		svgr({
			svgrOptions: {
				ref: true,
				svgo: false,
				titleProp: true,
			},
			include: '**/*.svg',
		}),
	],
});
