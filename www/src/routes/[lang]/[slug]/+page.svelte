<script>
	import { page } from "$app/stores";
	import { queryContent } from "$lib/index.js";
	import { t, locales, locale } from "$lib/translations";
	import { afterUpdate, onMount, tick } from "svelte";
	import j from "jquery";
	import Icon from "@iconify/svelte";

	export let data;
	$: pages = queryContent(data.content, data.category, "*", $locale);

	// $:
	// $: currIndex = pages.findIndex(
	// 	(obj) => obj.slug === currentPage.slug,
	// );

	let menuOpen = false;
	let menuContainer;

	function onWindowClick(e) {
		if (!menuContainer.contains(e.target)) menuOpen = false;
	}

	function onMenuClick() {
		menuOpen = !menuOpen;
	}

	let anchorLinks = [];
	let pageTriplet = {};

	onMount(() => {});

	afterUpdate(() => {
		anchorLinks = updatePageContentsList();
		pageTriplet = updateNeighboringPages();
	});

	function updateNeighboringPages() {
		const array = queryContent(
			data.content,
			data.category,
			"*",
			$locale,
		);
		const currentPage = queryContent(
			data.content,
			data.category,
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

	function updatePageContentsList() {
		const headers = j("h2, h3, h4, h5, h6");
		const newArray = [];
		headers.each(function (i, item) {
			const href = "#" + item.id;
			const text = item.innerText;
			newArray.push({ href, text });
		});

		return newArray;
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

<svelte:window on:click={onWindowClick} />

<section>
	<article
		class=" grid lg:grid-cols-[1.5fr_5fr_1.5fr] grid-cols-1 gap-6 mb-24 mt-12"
	>
		<!-- Title -->
		<ul
			bind:this={menuContainer}
			class="{menuOpen
				? ''
				: 'translate-x-[85%]'} pointer-events-none *:pointer-events-auto lg:translate-x-0 fixed right-0 top-0 lg:w-auto h-screen z-50 lg:sticky lg:h-min grid lg:z-0 grid-cols-[15%_,85%] text-sm transition-all min-w-72 lg:min-w-0 lg:flex"
		>
			<button
				class="bg-white dark:bg-gray-800 dark:hover:bg-gray-600 dark:border-gray-700 h-24 w-auto max-w-12 ml-auto shadow-md px-2 rounded-l-2xl self-center border flex justify-center items-center lg:hidden"
				on:click={onMenuClick}
			>
				<Icon
					icon={menuOpen ? "mdi:chevron-right" : "mdi:menu"}
					class="{menuOpen
						? ''
						: ''} text-2xl text-gray-400 transition-transform"
				></Icon>
			</button>
			<div
				class="border-l-2 lg:border-0 border-gray-100 dark:border-gray-700 shadow-xl lg:shadow-none bg-white dark:lg:bg-transparent dark:bg-gray-950 px-4 pt-4 w-full font-semibold flex flex-col"
			>
				<span class="mx-auto lg:hidden text-xl">Navigate</span>
				<hr class="lg:hidden my-2 mb-4" />
				<span class="mx-auto lg:m-0 uppercase tracking-widest">
					{data.category}
				</span>
				<div class="flex flex-col pt-2">
					{#each pages as anchor}
						<a
							class="{$page.params.slug === anchor.slug
								? 'font-medium border-l-2 border-gray-400 dark:border-white '
								: 'dark:border-gray-500 font-light border-l-2 dark:text-gray-300 text-gray-600'}   pl-3 ml-1 py-3"
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
					src="/{data.meta.cover}"
					alt="alt:{data.meta.cover}"
				/>
			{/if}
			<hgroup class="mb-6">
				<span
					class="uppercase font-bold tracking-widest text-xs text-gray-600 dark:text-gray-400"
				>
					{data.category}
				</span>
				<h1 class="text-2xl font-bold">{data.meta.title}</h1>
				<div class="mt-auto pt-2 flex gap-2 text-xs text-green-400">
					<span>{data.meta.date}</span>
					<!-- <span>•</span> -->
					<!-- <span>{"x"} minute read</span> -->
				</div>
			</hgroup>
			<div
				id="pc"
				class="page-content"
			>
				<svelte:component this={data.page} />
			</div>

			<div
				class="flex flex-col gap-4 mt-8 pt-8 border-t border-gray-300"
			>
				<div class="flex justify-between">
					{#each [pageTriplet.previousPage, pageTriplet.nextPage] as page, i}
						{#if page}
							<a
								href="/{$locale}/{page.slug}"
								class="flex flex-row gap-1 text-gray-600 items-center justify-center border rounded-lg border-gray-400 px-4 py-2 hover:bg-gray-100 dark:text-white dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800"
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
						{:else}
							<div></div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
		<ul
			class="lg:flex flex-col text-sm pt-4 sticky h-min top-0 hidden"
		>
			<span class="capitalize font-bold">On this page</span>
			<div
				class="flex flex-col pl-3 mt-2 ml-1 border-l-2 bg-white dark:bg-transparent w-full font-semibold"
				id="on-this-page"
			>
				{#each anchorLinks as anchor, i}
					<a
						class="font-light py-3 border-gray-100 dark:border-gray-700"
						href={anchor.href}
					>
						{anchor.text}
					</a>
				{/each}
			</div>
		</ul>
	</article>
</section>
