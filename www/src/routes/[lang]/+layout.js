import { sorting } from "$lib/content/sorting.js";

/** @type {import('./$types').PageLoad} */
export async function load() {
	const content = [];

	const paths = import.meta.glob("/src/lib/content/*/*.md", {
		eager: true,
	});

	for (const path in paths) {
		const file = paths[path];
		const pathParts = path.split("/");
		const slug = pathParts[pathParts.length - 1]?.split(".")[0];

		if (
			file &&
			typeof file === "object" &&
			"metadata" in file &&
			slug
		) {
			const { metadata } = file;
			const langMatch = path.match(/\.(.*?)\./);
			const lang = langMatch ? langMatch[1] : "";
			const post = { ...metadata, slug, lang };

			if (post.published) {
				content.push(post);
			}
		}
	}

	const combinedContent = Object.assign(
		{},
		...Object.entries(sorting).map(([categoryKey, slugs]) => {
			const categoryObj = {};

			slugs.forEach((slug) => {
				const matchingContent = content.filter(
					(item) => item.slug === slug,
				);

				if (matchingContent.length > 0) {
					const contentObj = {};

					matchingContent.forEach((item) => {
						contentObj[item.lang] = item;
					});

					categoryObj[slug] = contentObj;
				}
			});

			return { [categoryKey]: categoryObj };
		}),
	);

	return { content: combinedContent, sorting };
}
