import { error } from "@sveltejs/kit";
import { sorting } from "$lib/content/sorting.js";

export async function load({ params, data }) {
	const possibleCategories = Object.keys(sorting);
	for (const category of possibleCategories) {
		try {
			const file = await import(
				`../../../lib/content/${category}/${params.slug}.${params.lang}.md`
			);

			const currentIndex = possibleCategories.indexOf(category);
			let nextCategory = null;
			let previousCategory = null;

			if (currentIndex > 0) {
				previousCategory = possibleCategories[currentIndex - 1];
			} else {
				previousCategory =
					possibleCategories[possibleCategories.length - 1];
			}
			if (currentIndex < possibleCategories.length - 1) {
				nextCategory = possibleCategories[currentIndex + 1];
			} else {
				nextCategory = possibleCategories[0];
			}

			return {
				status: 200,
				page: file.default,
				meta: file.metadata,
				categories: {
					current: category,
					next: nextCategory,
					previous: previousCategory,
					all: possibleCategories,
				},
			};
		} catch (e) {
			// File not found in the current category, continue to the next one
		}
	}

	// If the loop completes without finding the file, throw a 404 error
	throw error(404);
}
