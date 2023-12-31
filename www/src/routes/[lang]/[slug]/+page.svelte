<script>
	import { page } from "$app/stores";
	import { queryContent } from "$lib/index.js";
	import { t, locales, locale } from "$lib/translations";
	import { afterUpdate, onMount, tick } from "svelte";
	import j from "jquery";
	import Icon from "@iconify/svelte";

	export let data;
	$: pages = queryContent(data.content, data.category, "*", $locale);

	$: currentPage = queryContent(
		data.content,
		data.category,
		$page.params.slug,
		$locale,
	)[0];

	// $: currIndex = pages.findIndex(
	// 	(obj) => obj.slug === currentPage.slug,
	// );

	let menu = false;

	let anchorLinks = [];

	onMount(() => {
		// Use tick to ensure that the scroll happens after the DOM update
		tick().then(() => {
			scrollToHash();
		});
	});

	afterUpdate(() => {
		window.js = j;
		// Find prev and next articles
		// Build the hashmarks and the on this page list
		anchorLinks = [];

		// Clear existing hash elements
		j("div#pc h2 a.anchor-hash").remove();

		j("div#pc h2").each(function () {
			const text = j(this).text();
			const slug = text.toLowerCase().replace(/\s+/g, "-");

			j(this).addClass("relative group w-fit");

			const anchor = {};
			anchor["text"] = text;
			anchor["href"] = "#" + slug;
			anchorLinks = [...anchorLinks, anchor];

			const hash = j("<a>")
				.text("#")
				.attr("id", slug)
				.attr("href", "#" + slug)
				.addClass(
					"absolute right-[-20px] md:left-[-20px] md:right-0 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity anchor-hash",
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
		class=" grid lg:grid-cols-[1.5fr_5fr_1.5fr] grid-cols-1 gap-6 mb-24 mt-6"
	>
		<!-- Title -->
		<ul
			class="{menu
				? ''
				: 'translate-x-56'} lg:translate-x-0 fixed right-0 top-0 w-64 lg:w-auto h-screen z-50 lg:sticky lg:h-min flex lg:z-0 flex-row text-sm transition-all"
		>
			<button
				class="bg-white h-24 w-auto shadow-sm mt-36 p-1 rounded-l-2xl border flex justify-center items-center lg:hidden"
				on:click={() => {
					menu = !menu;
				}}
			>
				<Icon
					icon={menu ? "mdi:chevron-right" : "mdi:menu"}
					class="{menu
						? ''
						: 'rotate-0'} text-3xl transition-transform"
				></Icon>
			</button>
			<div
				class="border-l-2 lg:border-0 border-gray-200 shadow-sm lg:shadow-none bg-white px-4 pt-4 w-full"
			>
				<h3 class="capitalize font-bold">{data.category}</h3>
				<div class="flex flex-col pt-2">
					{#each pages as anchor}
						<a
							class="{$page.params.slug === anchor.slug
								? 'font-medium border-l-2 border-gray-400 '
								: ' font-light border-l-2 '}   pl-3 ml-1 py-2"
							href={anchor.slug}
						>
							{anchor.title}
						</a>
					{/each}
				</div>
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
			<div
				id="pc"
				class="page-content"
			>
				<svelte:component this={data.page} />
			</div>
		</div>
		<ul
			class="lg:flex flex-col text-sm pt-4 sticky h-min top-0 hidden"
		>
			<h3 class="capitalize font-bold">On this page</h3>
			<div
				class="flex flex-col pl-3 mt-2 ml-1 gap-3 border-l-2 py-2"
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
