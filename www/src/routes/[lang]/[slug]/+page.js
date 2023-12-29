import { error } from "@sveltejs/kit";
import { readdir } from "fs/promises";

export async function load({ params }) {
	try {
		const possibleCategories = await readdir(
			`../www/src/lib/content`,
		);

		console.log(possibleCategories);

		for (const category of possibleCategories) {
			try {
				console.log(
					`../../../lib/content/${category}/${params.slug}/${params.slug}.${params.lang}.md`,
				);
				const file = await import(
					`../../../lib/content/${category}/${params.slug}/${params.slug}.${params.lang}.md`
				);

				console.log(`File found in ${category}`);
				console.log(file);
				console.log(file.default);
				console.log(file.metadata);
				return {
					status: 200,
					content: file.default,
					meta: file.metadata,
				};
			} catch (e) {
				console.log(`File not found in ${category}`);
				// File not found in the current category, continue to the next one
			}
		}

		// If the loop completes without finding the file, throw a 404 error
		// throw new Error("File not found");
	} catch (e) {
		// Log the error for debugging purposes
		console.error("Error:", e);

		// Throw a 404 error for generic errors
		throw error({ status: 404, message: "File not found" });
	}
}
