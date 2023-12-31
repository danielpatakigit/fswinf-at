<script>
	import { page } from "$app/stores";
	import { queryContent } from "$lib/index.js";
	import { t, locales, locale } from "$lib/translations";
	import { afterUpdate, onMount, tick } from "svelte";
	import j from "jquery";

	export let data;
	$: pages = queryContent(data.content, data.category, "*", $locale);
	let anchorLinks = [];
	afterUpdate(() => {
		window.js = j;
		// Build the hashmarks and the on this page list
		anchorLinks = [];

		// Clear existing hash elements
		j("div#page-content h2 a.anchor-hash").remove();

		j("div#page-content h2").each(function () {
			const text = j(this).text();
			const slug = text.toLowerCase().replace(/\s+/g, "-");

			j(this).addClass("relative group");

			const anchor = {};
			anchor["text"] = text;
			anchor["href"] = "#" + slug;
			anchorLinks = [...anchorLinks, anchor];

			const hash = j("<a>")
				.text("#")
				.attr("id", slug)
				.attr("href", "#" + slug)
				.addClass(
					"absolute left-[-20px] opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity anchor-hash",
				);

			j(this).append(hash);
		});

		// Use event delegation for the "On this page" links
		j("#on-this-page").on("click", "a", function (event) {
			event.preventDefault(); // Prevent the default behavior

			const targetId = j(this).attr("href").substring(1); // Remove the "#" from the href
			const targetElement = j("#" + targetId);

			if (targetElement.length) {
				j("html, body").animate(
					{
						scrollTop: targetElement.offset().top,
					},
					500,
				);
			}
		});
	});

	onMount(() => {
		// Use tick to ensure that the scroll happens after the DOM update
		tick().then(() => {
			scrollToHash();
		});
	});

	function scrollToHash() {
		if (window.location.hash) {
			const id = window.location.hash.substring(1);
			const targetElement = j("#" + id);

			if (targetElement.length) {
				j("html, body").animate(
					{
						scrollTop: targetElement.offset().top,
					},
					500,
				);
			}
		}
	}
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
	<article
		class=" grid grid-cols-[150px_auto_150px] gap-6 mb-24 mt-6"
	>
		<!-- Title -->
		<ul class="sticky top-0 flex flex-col gap-4 text-sm pt-2 h-min">
			<h3 class="capitalize font-bold">{data.category}</h3>
			<div class="flex flex-col">
				{#each pages as anchor}
					<a
						class="{$page.params.slug === anchor.slug
							? 'font-medium border-l-2 border-gray-400 '
							: ' font-light border-l-2 '}   pl-4 ml-2 py-2"
						href={anchor.slug}
					>
						{anchor.title}
					</a>
				{/each}
			</div>
		</ul>
		<div>
			{#if data.meta.cover}
				<img
					class="aspect-video object-cover w-full mb-12"
					src={data.meta.cover}
					alt="coverimg"
				/>
			{/if}
			<hgroup class="mb-6">
				<span
					class="uppercase font-bold tracking-widest text-xs text-gray-600"
				>
					{data.category}
				</span>
				<h1 class="text-3xl font-bold">{data.meta.title}</h1>
				<div class="mt-auto pt-2 flex gap-2 text-xs text-green-600">
					<span>{data.meta.date}</span>
					<span>•</span>
					<span>{"x"} minute read</span>
				</div>
			</hgroup>
			<div id="page-content">
				<svelte:component this={data.page} />
			</div>
		</div>
		<ul class="flex flex-col gap-4 text-sm pt-2 sticky h-min top-0">
			<h3 class="capitalize font-bold">On this page</h3>
			<div
				class="flex flex-col pl-4 ml-2 gap-3 border-l-2"
				id="on-this-page"
			>
				{#each anchorLinks as anchor, i}
					<a
						class="font-light"
						href={anchor.href}
					>
						{anchor.text}
					</a>
				{/each}
			</div>
		</ul>
	</article>
</section>

<style lang="postcss">
	h1 {
	}
</style>
