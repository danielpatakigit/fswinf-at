// place files you want to import through the `$lib` alias in this folder.
export function queryContent(combinedContent, category, page, lang) {
	const result = [];

	for (const [categoryKey, categoryObj] of Object.entries(
		combinedContent,
	)) {
		if (category === "*" || categoryKey === category) {
			for (const [pageKey, pageObj] of Object.entries(categoryObj)) {
				if (page === "*" || pageKey === page) {
					for (const [langKey, langObj] of Object.entries(pageObj)) {
						if (lang === "*" || langKey === lang) {
							result.push(langObj);
						}
					}
				}
			}
		}
	}

	return result.length > 0 ? result : [];
}

export function getCategoriesAndPages(content) {
	const result = {};

	for (const [category, pages] of Object.entries(content)) {
		result[category] = Object.keys(pages);
	}

	return Object.entries(result);
}
