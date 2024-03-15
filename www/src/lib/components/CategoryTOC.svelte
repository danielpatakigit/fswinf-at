<script>
	import { getCategoriesAndPages } from "$lib/index.js";
	import Icon from "@iconify/svelte";
	import { t, locales, locale } from "$lib/translations";
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	export let pages;
	export let data;

	let scrollPercentage = 0;
	let scrollY;
	let innerHeight;

	onMount(() => {
		window.addEventListener("scroll", () => {
			calculateScrollPercentage();
		});
	}); // $: nextPage = { name: data.categories.next };

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

	function calculateScrollPercentage() {
		const temp = (
			scrollY.toFixed(0) /
			(document.body.scrollHeight - innerHeight)
		).toFixed(2);

		scrollPercentage = temp > 1 ? 1 : temp;

		// if percentage is smaller than 10 or bigger than 90 snap to either 0 or 100 to avoid lag from the scroll function
		scrollPercentage =
			scrollPercentage * 100 < 8
				? 0
				: scrollPercentage * 100 > 90
					? 100
					: scrollPercentage * 100;
	}
</script>

<svelte:window
	bind:scrollY
	bind:innerHeight
/>

<div class="w-full font-semibold flex flex-col font-header">
	<div
		class="flex items-center relative *:flex-1 flex-row justify-center"
	>
		<a
			class=" text-winfgreen-400 lg:absolute hidden lg:block opacity-65 hover:opacity-100 -left-5 hover:text-winfgreen-500"
			href="/{$locale}/{previousCategory.href}"
			id={previousCategory.name}
		>
			<Icon
				class="text-lg"
				icon="mdi:chevron-left"
			></Icon>
		</a>
		<span class="capitalize text-left lg:pl-2">
			{$t(`standard.${currentCategory}`)}
		</span>
		<a
			class="flex text-winfgreen-400 opacity-65 hover:opacity-100 items-center ml-8 capitalize justify-end"
			href="/{$locale}/{nextCategory.href}"
		>
			<span class="text-xs">
				{$t(`standard.${nextCategory.name}`)}
			</span>
			<Icon
				icon="mdi:chevron-right"
				class="text-lg"
			></Icon>
		</a>
	</div>
	<div class="flex flex-col pt-2">
		{#each pages as anchor, i}
			{@const current = $page.params.slug === anchor.slug}
			<a
				class="{current
					? 'font-semibold bg-slate-100 dark:bg-slate-800 border-slate-600'
					: 'dark:border-slate-500 font-medium border-l-2 dark:text-slate-300 text-slate-500'} lg:ml-2 pl-3 pr-2 py-3 relative"
				href={anchor.slug}
			>
				{#if current}
					<div
						class="w-[2px] h-full bg-slate-200 dark:bg-white absolute left-0 top-0"
					>
						<div
							class="w-full bg-winfgreen-400 dark:bg-winfgreen-400"
							style="height: {scrollPercentage}%;"
						></div>
					</div>
				{/if}
				<span>
					{anchor.title}
				</span>
			</a>
		{/each}
	</div>
</div>
