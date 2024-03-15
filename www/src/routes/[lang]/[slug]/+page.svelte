<script>
	import PageContent from "./../../../lib/components/PageContent.svelte";
	import PageTOC from "$lib/components/PageTOC.svelte";
	import CategoryTOC from "$lib/components/CategoryTOC.svelte";
	import NavigationShelf from "../../../lib/components/NavigationShelf.svelte";

	import { page } from "$app/stores";
	import { queryContent, getCategoriesAndPages } from "$lib/index.js";
	import { t, locales, locale } from "$lib/translations";
	import Icon from "@iconify/svelte";
	import { afterNavigate } from "$app/navigation";
	import { fade, fly } from "svelte/transition";
	import { quintOut } from "svelte/easing";

	export let data;
	$: pages = queryContent(
		data.content,
		data.categories.current,
		"*",
		$locale,
	);
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta
		property="og:type"
		content="article"
	/>
	<meta
		property="og:title"
		content={data.meta.title}
	/>
</svelte:head>
<NavigationShelf>
	<CategoryTOC
		{data}
		{pages}
	></CategoryTOC>
	<PageTOC></PageTOC>
</NavigationShelf>

<section>
	<article
		class="grid lg:grid-cols-[1.5fr_5fr_1.5fr] grid-cols-1 gap-6 mb-24 mt-12"
	>
		<div class="lg:block hidden h-min sticky top-4">
			<CategoryTOC
				{data}
				{pages}
			></CategoryTOC>
		</div>
		<div>
			<PageContent {data}></PageContent>
		</div>
		<div class="lg:block hidden h-min sticky top-4">
			<PageTOC></PageTOC>
		</div>
	</article>
</section>
