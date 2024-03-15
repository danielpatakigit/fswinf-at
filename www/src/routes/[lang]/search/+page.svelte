<script>
	import { queryContent } from "$lib/index.js";
	/** @type {import('./$types').PageData} */
	export let data;
	import { t, locales, locale } from "$lib/translations";
	import Icon from "@iconify/svelte";

	let term = "";
	let results = [];

	$: if (data.content) {
		results = queryContent(data.content, "*", "*", $locale);

		if (term && term.trim() !== "") {
			results = results
				.map((result) => {
					const { title, description, slug } = result;
					const searchTermLower = term.toLowerCase();

					// Initialize the score
					let score = 0;

					// Score based on title match
					if (title.toLowerCase().includes(searchTermLower)) {
						score += 3;
					}

					// Score based on slug match
					if (slug.toLowerCase().includes(searchTermLower)) {
						score += 2;
					}

					// Score based on description match
					if (description.toLowerCase().includes(searchTermLower)) {
						score += 1;
					}

					return { result, score };
				})
				.filter((item) => item.score > 0) // Remove items with no match
				.sort((a, b) => b.score - a.score) // Order by score, higher scores first
				.map((item) => item.result);
		}
	}
</script>

<section>
	<article class="flex gap-4 flex-col mt-12 mb-24">
		<h1 class="text-xl font-bold text-center">Search for anything</h1>
		<div
			class="flex flex-row border-2 p-2 border-slate-700 rounded-md gap-4 items-center"
		>
			<Icon
				icon="mdi:search"
				class="text-2xl"
			></Icon>
			<input
				class=" focus-visible:outline-none w-full h-full text-lg text-slate-800 dark:text-white"
				type="text"
				placeholder="Search..."
				bind:value={term}
			/>
		</div>
		<div
			id="suggested"
			class="flex gap-2"
		>
			<div class="font-bold">Popular pages:</div>
			<a href="/{$locale}">Home</a>
			<a href="/{$locale}">etc.</a>
			<a href="/{$locale}">etc.</a>
		</div>
		<div
			id="results"
			class="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-4"
		>
			{#each results as result, i}
				<a
					href="/{$locale}/{result.slug}"
					class=" shadow-md border border-slate-200 dark:border-slate-600 dark:bg-slate-800 p-2 min-h-24 flex flex-col hover:bg-slate-100 dark:hover:bg-slate-700 gap-4"
				>
					<h2 class=" text-xl">
						<div
							class="mt-auto pt-2 flex gap-2 text-xs text-winfgreen-400"
						>
							<span>{result.date}</span>
							<!-- <span>•</span>
						<span>{i} minute read</span> -->
						</div>
						<span class="font-bold">{result.title}</span>
					</h2>
					<p
						class="font-normal text-sm text-slate-500 dark:text-slate-200 line-clamp-3"
					>
						{result.description}
					</p>
				</a>
			{/each}
		</div>
	</article>
</section>
