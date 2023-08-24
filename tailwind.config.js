/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import { theme } from './src/lib/config/general';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						'ul:has(li):has(input[type="checkbox"])': {
							padding: 0
						},
						'ul > li:has(input[type="checkbox"])': {
							listStyle: 'none'
						},
						'ul > li:has(input[type="checkbox"]) ul li': {
							paddingLeft: 30
						}
					}
				}
			}
		}
	},
	plugins: [daisyui],
	daisyui: { themes: theme.map(({ name }) => name) }
};
