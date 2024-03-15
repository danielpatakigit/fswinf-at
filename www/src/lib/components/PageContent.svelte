<script>
	import { page } from "$app/stores";
	import { queryContent, getCategoriesAndPages } from "$lib/index.js";
	import { t, locales, locale } from "$lib/translations";
	import Icon from "@iconify/svelte";
	import { afterNavigate } from "$app/navigation";
	import { fade, fly } from "svelte/transition";
	import { quintOut } from "svelte/easing";

	export let data;
	let pageTriplet = {};
	afterNavigate(() => {
		pageTriplet = updateNeighboringPages();
		// addBlankTargetToLinks();
	});

	let nextCategory = { name: "", href: "" };
	let previousCategory = { name: "", href: "" };
	let currentCategory = "";
	$: if (data.content) {
		const next = data.categories.next;
		const previous = data.categories.previous;
		const current = data.categories.current;
		// const all = data.categories.all;
		const content = data.content;
		const nextPages = getCategoriesAndPages(content, next);
		const previousPages = getCategoriesAndPages(content, previous);

		previousCategory = { name: previous, href: previousPages[0] };
		currentCategory = current;
		nextCategory = { name: next, href: nextPages[0] };
	}

	function updateNeighboringPages() {
		const array = queryContent(
			data.content,
			data.categories.current,
			"*",
			$locale,
		);
		const currentPage = queryContent(
			data.content,
			data.categories.current,
			$page.params.slug,
			$locale,
		)[0];
		const index = array.findIndex(
			(element) => element === currentPage,
		);

		if (index === -1) {
			// Element not found in the array
			return null;
		}

		const previousPage = array[index - 1] || null;
		const nextPage = array[index + 1] || null;

		return { previousPage, currentPage, nextPage };
	}

	// function addBlankTargetToLinks() {
	// 	const container = document.getElementById("pc");

	// 	if (container) {
	// 		const links = container.getElementsByTagName("a");

	// 		for (let i = 0; i < links.length; i++) {
	// 			links[i].setAttribute("target", "_blank");
	// 		}
	// 	} else {
	// 		console.error(`Element with ID '${elementId}' not found.`);
	// 	}
	// }
</script>

{#if data.meta.cover}
	<img
		class="aspect-video object-cover w-full mb-12"
		src="/{data.meta.cover}"
		alt="alt:{data.meta.cover}"
	/>
{/if}
<hgroup class="mb-6">
	<span
		class="uppercase font-bold tracking-widest text-xs text-slate-600 dark:text-slate-400"
	></span>
	<h1 class="text-4xl font-bold leading-[1.2] font-header">
		{data.meta.title}
	</h1>
	<div
		class="mt-auto pt-2 flex gap-2 text-xs font-bold text-winfgreen-400 font-header"
	>
		<span>{data.meta.date}</span>
		<span class="text-slate-800">•</span>
		<span class="uppercase tracking-wide text-winfblue-400">
			{$t(`standard.${data.categories.current}`)}
		</span>
	</div>
</hgroup>
<div
	id="pc"
	class="page-content"
>
	<svelte:component this={data.page} />
</div>

<div class="flex flex-col gap-4 mt-8 pt-8 border-t border-slate-300">
	<div class="flex justify-between">
		{#each [pageTriplet.previousPage, pageTriplet.nextPage] as page, i}
			{#if page}
				<a
					href="/{$locale}/{page.slug}"
					class="flex flex-row gap-1 text-slate-600 items-center justify-center border rounded-lg border-slate-400 px-4 py-2 hover:bg-slate-100 dark:text-white dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800"
				>
					<div class="{i == 0 ? '' : 'order-2'} ">
						<Icon
							icon="gravity-ui:chevron-right"
							class="{i == 0 ? 'rotate-180' : ''} text-xl"
						></Icon>
					</div>
					<div>
						<span class="font-medium">
							{page.title}
						</span>
					</div>
				</a>
			{:else if i > 0}
				<a
					href="/{$locale}/{i == 0 ? '' : nextCategory.href}"
					class="flex flex-row gap-1 text-white items-center justify-center rounded-lg px-4 py-2 bg-winfgreen-400 hover:bg-winfgreen-600 dark:text-white dark:bg-winfgreen-500 dark:hover:bg-winfgreen-600"
				>
					<div class="{i == 0 ? '' : 'order-2'} ">
						<Icon
							icon="gravity-ui:chevron-right"
							class="{i == 0 ? 'rotate-180' : ''} text-xl"
						></Icon>
					</div>
					<div class="flex flex-col gap-0">
						<span class="text-xs">{$t("standard.read_more")}</span>
						<span class="font-medium capitalize">
							{i == 0 ? "" : $t(`standard.${nextCategory.name}`)}
						</span>
					</div>
				</a>
			{:else}
				<div></div>
			{/if}
		{/each}
	</div>
</div>
