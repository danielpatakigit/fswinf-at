import { json } from "@sveltejs/kit";

async function getPosts() {
	let posts = [];

	const paths = import.meta.glob("/src/lib/posts/*/*.md", {
		eager: true,
	});

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split("/").at(-1)?.split(".")[0];

		if (
			file &&
			typeof file === "object" &&
			"metadata" in file &&
			slug
		) {
			const metadata = file.metadata;
			const langMatch = path.match(/\.(.*?)\./);
			const lang = langMatch ? langMatch[1] : ""; // Extract language code
			const post = { ...metadata, slug, lang };
			post.published && posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) =>
			new Date(second.date).getTime() -
			new Date(first.date).getTime(),
	);

	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
