import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const possibleCategories = ["pages", "posts"];
	for (const category of possibleCategories) {
		try {
			const file = await import(
				`../../../lib/content/${category}/${params.slug}/${params.slug}.${params.lang}.md`
			);

			return {
				status: 200,
				content: file.default,
				meta: file.metadata,
			};
		} catch (e) {
			// File not found in the current category, continue to the next one
		}
	}

	// If the loop completes without finding the file, throw a 404 error
	throw error(404);
}
