<script>
	import { t, locales, locale } from "$lib/translations";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import {
		ModeWatcher,
		toggleMode,
		mode,
		setMode,
		resetMode,
	} from "mode-watcher";
	import Icon from "@iconify/svelte";
	import { onNavigate, invalidateAll } from "$app/navigation";
	import "../../app.pcss";
	import { Hamburger } from "svelte-hamburgers";
	import { onMount } from "svelte";

	// onNavigate((navigation) => {
	// 	if (!document.startViewTransition) return;

	// 	return new Promise((resolve) => {
	// 		document.startViewTransition(async () => {
	// 			resolve();
	// 			await navigation.complete;
	// 		});
	// 	});
	// });

	export let data;

	$: ({ route } = $page.data);

	let open = false;
	let search = false;
	let term = "";
	let results = [];

	function toggleSearch() {
		search = search ? false : true;
	}
	function closeSearch() {
		search = false;
	}

	function queryContent(combinedContent, category, page, lang) {
		const result = [];

		for (const [categoryKey, categoryObj] of Object.entries(
			combinedContent,
		)) {
			if (category === "*" || categoryKey === category) {
				for (const [pageKey, pageObj] of Object.entries(
					categoryObj,
				)) {
					if (page === "*" || pageKey === page) {
						for (const [langKey, langObj] of Object.entries(
							pageObj,
						)) {
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

	function getCategoriesAndPages(content) {
		const result = {};

		for (const [category, pages] of Object.entries(content)) {
			result[category] = Object.keys(pages);
		}

		return Object.entries(result);
	}
</script>

<ModeWatcher defaultMode={"dark"}></ModeWatcher>

<header class="min-h-[3rem] relative flex justify-between">
	<div class="flex gap-2 flex-row items-center justify-center w-52">
		<Icon icon="mdi:home"></Icon>
		<Icon icon="mdi:home"></Icon>
		<Icon icon="mdi:home"></Icon>
		<Icon icon="mdi:home"></Icon>
	</div>
	<a href="/{$locale}">
		<img
			class="max-h-12 m-auto"
			src="/src/static/logo_Marginless.png"
			alt="winf-logo"
		/>
	</a>
	<div class="flex items-center justify-center gap-2 w-52">
		<select
			on:change={({ target }) => {
				goto(target.value);
			}}
		>
			{#each $locales as lc}
				<option
					value="/{lc}{route}"
					selected={lc === $locale}
				>
					{lc}
				</option>
			{/each}
		</select>
		<button
			on:click={toggleMode}
			class=""
		>
			<Icon
				icon={"mdi:theme-light-dark"}
				class="text-4xl"
			></Icon>
		</button>
		<button on:click={toggleSearch}>
			<Icon
				icon={"mdi:search"}
				class="text-4xl"
			></Icon>
		</button>
		<!-- <button>
			<Hamburger bind:open></Hamburger>
		</button> -->
	</div>
</header>
<nav class="mt-4 py-2 flex flex-row w-full justify-around border-b-4">
	{#each getCategoriesAndPages(data.content) as [category, pages]}
		<a
			href="/{$locale}/{pages[0] ? pages[0] : ''}"
			class="uppercase"
		>
			{category}
		</a>
	{/each}

	<!-- {#each data.sorting as category, i}
		{@const [name, pages] = Object.entries(category)[0]}
		<a
			href="/{$locale}/{pages[0] ? pages[0] : ''}"
			class="uppercase"
		>
			{name}
		</a>
	{/each} -->
</nav>

<div
	id="modal"
	class="{search
		? 'visible'
		: 'invisible'} fixed h-screen w-screen max-w-full flex items-center justify-center backdrop-blur-sm bg-white/30"
>
	<div class="border bg-white p-4 max-w-min">
		<div class="flex justify-between">
			<h2>Search for anything</h2>
			<button on:click={closeSearch}>
				<Icon icon="mdi:close"></Icon>
			</button>
		</div>
		<div class="flex flex-row border gap-4 items-center">
			<Icon icon="mdi:search"></Icon>
			<input
				type="text"
				placeholder="Search..."
				bind:value={term}
			/>
		</div>
		<div
			id="suggested"
			class="flex gap-2"
		>
			<div>Lorem ipsum dolor sit.</div>
			<div>Sed ipsam cum soluta.</div>
			<div>Id consectetur eum rem?</div>
		</div>
		<div
			id="results"
			class="flex flex-col gap-2"
		>
			{#each results as result, i}
				<a
					href="/{$locale}/{result.slug}"
					class="border"
					on:click={closeSearch}
				>
					{JSON.stringify(result, null, "\t")}
				</a>
			{/each}
		</div>
	</div>
</div>

<main>
	<slot />
</main>

<section class="bg-green-200">
	<article>
		<footer class="flex flex-col border-t-4 mt-4 py-4 gap-4">
			<div class="grid grid-cols-4 grid-rows-2 gap-4 grid-flow-col">
				{#each Array(8) as _, i}
					<span class="uppercase text-center font-bold">
						menupoint {i}
					</span>
				{/each}
			</div>
			<div class="flex flex-row justify-between border my-2 py-2">
				<div class="max-w-[10rem] flex justify-center items-center">
					<img
						src="/src/static/logo_Marginless.png"
						alt="logo"
					/>
				</div>
				<div class="flex gap-2 items-center justify-center">
					{#each Array(5) as _, i}
						<span>Icon {i}</span>
					{/each}
				</div>
			</div>
			<div class="text-sm font-light flex gap-4 text-black">
				<span>Terms of use</span>
				<span>Privacy Policy</span>
				<span>Etc.</span>
			</div>
			<div class="font-light text-sm">
				Copyright c <br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
				a dolores? Perspiciatis facilis vitae cum molestias repellat id
				sint dolorem.
			</div>
		</footer>
	</article>
</section>
