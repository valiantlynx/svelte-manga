import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import dotenv from 'dotenv'
dotenv.config()

let {PUBLIC_DEPLOY_TARGET} = process.env
const deployTarget = PUBLIC_DEPLOY_TARGET || 'auto'; // Default to 'auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: deployTarget === 'auto' ? adapterAuto() : adapterNode()
	}
};

export default config;
