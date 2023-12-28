import { error } from "@sveltejs/kit";

export async function load({ params }) {
	try {
		const post = await import(
			`../../../lib/content/${params.slug}/${params.slug}.${params.lang}.md`
		);
		return {
			content: post.default,
			meta: post.metadata,
		};
	} catch (e) {
		throw error(404, "An error occured");
	}
