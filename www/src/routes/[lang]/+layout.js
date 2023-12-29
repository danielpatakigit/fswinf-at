import { json } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load() {
	let content = [];

	const paths = import.meta.glob("/src/lib/content/*/*/*.md", {
		eager: true,
	});

	for (const path in paths) {
		const file = paths[path];

		const pathParts = path.split("/");
		const category = pathParts[pathParts.length - 3];
		const slug = pathParts[pathParts.length - 2]?.split(".")[0];

		if (
			file &&
			typeof file === "object" &&
			"metadata" in file &&
			slug
		) {
			const metadata = file.metadata;
			const langMatch = path.match(/\.(.*?)\./);
			const lang = langMatch ? langMatch[1] : ""; // Extract language code
			const post = { ...metadata, category, slug, lang };
			post.published && content.push(post);
		}
	}

	content = content.sort(
		(first, second) =>
			new Date(second.date).getTime() -
			new Date(first.date).getTime(),
	);

	return { content: content };
}
