import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { importAssets } from "svelte-preprocess-import-assets";

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: [".md"],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".md"],

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		mdsvex(mdsvexOptions),
		importAssets(),
		vitePreprocess({}),
	],

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: "build",
			assets: "build",
			fallback: null,
			precompress: false,
			strict: true,
		}),
		prerender: {
			crawl: true,
			entries: ["/en", "/de", "*"],
			handleHttpError: "warn",
		},
	},
};

export default config;
