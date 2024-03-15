import adapter from "@sveltejs/adapter-auto";

import { mdsvex } from "mdsvex";
import { vitePreprocess } from "@sveltejs/kit/vite";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

import lang from "./src/lib/translations/lang.js";

const supportedLocales = Object.keys(lang);

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: [".md"],
	rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".md"],

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [mdsvex(mdsvexOptions), vitePreprocess({})],

	kit: {
		adapter: adapter(),
		prerender: {
			crawl: true,
			// NOTE: You can modify your exported error pages here.
			entries: supportedLocales.reduce(
				(acc, locale) => [...acc, `/${locale}`],
				["*"],
			),
		},
	},
};

export default config;
