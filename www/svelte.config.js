import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";
import lang from "./src/lib/translations/lang.js";

// lang config
const supportedLocales = Object.keys(lang);

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: [".md"],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".md"],

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [mdsvex(mdsvexOptions), vitePreprocess({})],

	kit: {
		files: {
			assets: "src/lib/assets",
		},
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
			entries:
				// supportedLocales.reduce(
				// 	(acc, locale) => [
				// 		...acc,
				// 		`/${locale}`,
				// 		`/${locale}/401`,
				// 		`/${locale}/403`,
				// 		`/${locale}/404`,
				// 		`/${locale}/500`,
				// 	],
				["/en", "/de", "*"],
		},
	},
};

export default config;
