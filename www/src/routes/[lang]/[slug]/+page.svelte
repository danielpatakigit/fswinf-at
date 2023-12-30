<script>
	import { page } from "$app/stores";
	import { queryContent } from "$lib/index.js";
	import { t, locales, locale } from "$lib/translations";
	import { onMount, tick } from "svelte";

	export let data;
	$: pages = queryContent(data.content, data.category, "*", $locale);

	let anchorLinks = [];
	onMount(() => {
		// Replace standard h2 tags
		const h2Elements = document.querySelectorAll(
			"#page-content h2[data-svelte-h]",
		);
		h2Elements.forEach((h2) => {
			const text = h2.textContent;
			const slug = text.toLowerCase().replace(/\s+/g, "-");

			// Create and append the anchor element
			const anchor = document.createElement("a");
			anchor.href = `#${slug}`;
			anchor.id = slug;
			anchor.tabIndex = -1;
			anchor.textContent = "#";
			anchor.classList = "absolute left-[-15px]";
			h2.classList = "relative";
			h2.appendChild(anchor);

			// Collect the anchor links
			anchorLinks = [...anchorLinks, { text, href: `#${slug}` }];
		});
	});
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

<section>
	<article class="grid grid-cols-[150px_auto_150px]">
		<!-- Title -->
		<ul>
			<span>{data.category}</span>
			{#each pages as page}
				<li><a href={page.slug}>{page.title}</a></li>
			{/each}
		</ul>
		<div id="page-content">
			<h1>{data.meta.title}</h1>
			<p>Published at ({data.meta.date})</p>
			<svelte:component this={data.page} />
		</div>
		<ul>
			<span>On this page</span>
			{#each anchorLinks as anchor}
				<li>
					<a href={anchor.href}>
						{anchor.text}
					</a>
				</li>
			{/each}
		</ul>
	</article>
</section>
