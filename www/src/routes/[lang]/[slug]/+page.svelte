<script>
	import { page } from "$app/stores";
	import { queryContent, getCategoriesAndPages } from "$lib/index.js";
	import { t, locales, locale } from "$lib/translations";
	import { afterUpdate, onMount, tick } from "svelte";
	import Icon from "@iconify/svelte";
	import { afterNavigate } from "$app/navigation";
	import { fade } from "svelte/transition";

	export let data;
	$: pages = queryContent(
		data.content,
		data.categories.current,
		"*",
		$locale,
	);

	let menuOpen = false;
	let menuContainer;

	function onWindowClick(e) {
		if (!menuContainer.contains(e.target)) menuOpen = false;
	}

	function onMenuClick() {
		menuOpen = !menuOpen;
	}

	function onWindowScroll() {
		let lastTrueIndex = -1;

		anchorLinks.forEach((link, i) => {
			if (link.item.getBoundingClientRect().top < 210) {
				lastTrueIndex = i;
			}
		});

		anchorLinks.forEach((link, i) => {
			link.current = i === lastTrueIndex;
		});
		const temp = [...anchorLinks];
		anchorLinks = [...temp];
	}
	let anchorLinks = [];
	let pageTriplet = {};
	afterNavigate(() => {
		anchorLinks = updatePageContentsList();
		pageTriplet = updateNeighboringPages();
	});

	// $: nextPage = { name: data.categories.next };

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

	onMount(() => {
		console.log(data.content);
	});

	afterUpdate(() => {});

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

	function updatePageContentsList() {
		const headers = document.querySelectorAll("h2, h3, h4, h5, h6");
		const newArray = [];

		headers.forEach(function (item) {
			const href = "#" + item.id;
			const text = item.innerText;
			const current = false;
			newArray.push({ href, current, text, item });
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

<svelte:window
	on:click={onWindowClick}
	on:scroll={onWindowScroll}
/>

<section>
	<article
		class=" grid lg:grid-cols-[1.5fr_5fr_1.5fr] grid-cols-1 gap-6 mb-24 mt-12"
	>
		<!-- Title -->
		<ul
			bind:this={menuContainer}
			class="{menuOpen
				? ''
				: 'translate-x-[85%]'} pointer-events-none *:pointer-events-auto lg:translate-x-0 fixed right-0 top-0 lg:w-auto h-screen z-50 lg:sticky lg:h-min grid lg:z-0 grid-cols-[15%_,85%] text-sm transition-all min-w-72 lg:min-w-0 lg:flex overflow-y-scroll"
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
				<div
					class="flex items-center lg:gap-1 relative *:flex-1 flex-row justify-center"
				>
					<a
						class=" text-green-400 lg:absolute opacity-65 hover:opacity-100 -left-5 hover:text-green-500"
						href="/{$locale}/{previousCategory.href}"
						id={previousCategory.name}
					>
						<Icon
							class="text-lg"
							icon="mdi:chevron-left"
						></Icon>
					</a>
					<span class="capitalize text-center lg:text-left">
						{currentCategory}
					</span>
					<a
						class="flex text-green-400 opacity-65 hover:opacity-100 items-center lg:ml-8 capitalize ml-auto justify-end"
						href="/{$locale}/{nextCategory.href}"
					>
						<span class="text-xs">
							{nextCategory.name}
						</span>
						<Icon
							icon="mdi:chevron-right"
							class="text-lg"
						></Icon>
					</a>
				</div>
				<div class="flex flex-col pt-2">
					{#each pages as anchor}
						<a
							class="{$page.params.slug === anchor.slug
								? 'font-medium border-l-2 border-gray-400 dark:border-white '
								: 'dark:border-gray-500 font-light border-l-2 dark:text-gray-300 text-gray-600'}   pl-3 ml-0 py-3"
							href={anchor.slug}
						>
							{anchor.title}
						</a>
					{/each}
				</div>
				<div class="lg:hidden flex-col pt-4 text-center">
					<span class="capitalize font-bold text-base">
						On this page
					</span>
					<hr class="lg:hidden my-2 mb-4" />

					<div
						class="flex flex-col mt-2 font-light text-sm bg-white dark:bg-transparent w-full"
						id="on-this-page"
					>
						{#if anchorLinks.length > 0}
							{#each anchorLinks as anchor, i}
								<a
									class="{anchor.current
										? 'font-bold bg-gray-200 border-green-400 dark:bg-gray-950 dark:border-green-400'
										: 'font-extralight'}  py-3 pl-2 border-gray-100 dark:border-gray-700 border-l-2"
									href={anchor.href}
								>
									{anchor.text}
								</a>
							{/each}
						{:else}
							<span class="">No headers to show!</span>
						{/if}
					</div>
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
					{data.categories.current}
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
						{:else if i > 0}
							<a
								href="/{$locale}/{i == 0 ? '' : nextCategory.href}"
								class="flex flex-row gap-1 text-white items-center justify-center rounded-lg px-4 py-2 bg-green-500 hover:bg-green-600 dark:text-white dark:bg-green-500 dark:hover:bg-green-600"
							>
								<div class="{i == 0 ? '' : 'order-2'} ">
									<Icon
										icon="gravity-ui:chevron-right"
										class="{i == 0 ? 'rotate-180' : ''} text-xl"
									></Icon>
								</div>
								<div class="flex flex-col gap-0">
									<span class="text-xs">More in:</span>
									<span class="font-medium capitalize">
										{i == 0 ? "" : nextCategory.name}
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
				class="flex flex-col mt-2 font-light text-xs bg-white dark:bg-transparent w-full"
				id="on-this-page"
			>
				{#if anchorLinks.length > 0}
					{#each anchorLinks as anchor, i}
						<a
							class="{anchor.current
								? 'font-bold bg-gray-200 border-green-400 dark:bg-gray-950 dark:border-green-400'
								: ''}  py-2 pl-2 border-gray-100 dark:border-gray-700 border-l-2"
							href={anchor.href}
						>
							{anchor.text}
						</a>
					{/each}
				{:else}
					<span class="">No headers to show!</span>
				{/if}
			</div>
		</ul>
	</article>
</section>
