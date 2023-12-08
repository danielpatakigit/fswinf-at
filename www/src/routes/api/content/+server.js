import { json } from "@sveltejs/kit";

async function getContent() {
	let content = [];

	const paths = import.meta.glob("/src/content/*.md", {
		eager: true,
	});
	console.log(paths);

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split("/").at(-1)?.replace(".md", "");

		if (
			file &&
			typeof file === "object" &&
			"metadata" in file &&
			slug
		) {
			const metadata = file.metadata;
			const page = { ...metadata, slug };
			page.published && content.push(page);
		}
	}

	content = content.sort(
		(first, second) =>
			new Date(second.date).getTime() -
			new Date(first.date).getTime(),
	);

	return content;
}

export async function GET() {
	const content = await getContent();
	return json(content);
}
