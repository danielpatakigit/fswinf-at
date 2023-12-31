import { sorting } from "$lib/content/sorting.js";

/** @type {import('./$types').PageLoad} */
export async function load() {
	// Initialize an array to store content data
	const contentArray = [];

	// Use import.meta.glob to retrieve file paths
	const filePaths = import.meta.glob("/src/lib/content/*/*.md", {
		eager: true,
	});

	// Iterate through each path
	for (const path in filePaths) {
		const file = filePaths[path];
		const pathParts = path.split("/");
		const category = pathParts[pathParts.length - 2];
		const slug = pathParts[pathParts.length - 1]?.split(".")[0];

		// Check if the file is an object with metadata and a valid slug
		if (
			file &&
			typeof file === "object" &&
			"metadata" in file &&
			slug
		) {
			// Destructure metadata and extract language from the path
			const { metadata } = file;
			const langMatch = path.match(/\.(.*?)\./);
			const lang = langMatch ? langMatch[1] : "";
			const post = { ...metadata, slug, category, lang };

			// Create an object with language key and push it to the content array
			const languageObject = { [lang]: post };
			contentArray.push(languageObject);
		}
	}

	// Initialize an object to store the final sorted content
	const sortedContent = {};

	// Iterate through sorting entries
	Object.entries(sorting).forEach(([sortingKey, sortingValue]) => {
		// Use reduce to build the result for each sorting entry
		sortedContent[sortingKey] = sortingValue.reduce((acc, item) => {
			// Filter content array based on the current sorting item
			const filteredContent = contentArray.filter(
				(contentObj) =>
					contentObj[Object.keys(contentObj)[0]].slug === item,
			);

			// Reduce the filtered array to build the final language-based object
			const reducedLanguageObject = filteredContent.reduce(
				(langAcc, contentItem) => {
					const languageKey = Object.keys(contentItem)[0];
					langAcc[languageKey] = contentItem[languageKey];
					return langAcc;
				},
				{},
			);

			// Assign the language-based object to the current sorting item
			acc[item] = reducedLanguageObject;
			return acc;
		}, {});
	});

	// Return the final result along with the original sorting data
	return {
		content: sortedContent,
		sorting,
	};
}
