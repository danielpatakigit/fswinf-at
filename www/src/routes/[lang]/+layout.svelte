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
	import { onNavigate } from "$app/navigation";
	import "../../app.pcss";
	import logo from "$lib/assets/logo_Marginless.png";
	import { Hamburger } from "svelte-hamburgers";

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
	// console.log("Content data:", data);
	let results = [];
	$: if (data.content) {
		results = data.content
			.filter((post) => {
				const searchTerm = term.toLowerCase();

				return (
					post.lang === $locale &&
					(post.title.toLowerCase().includes(searchTerm) ||
						post.description.toLowerCase().includes(searchTerm) ||
						post.category.toLowerCase().includes(searchTerm) ||
						post.slug.toLowerCase().includes(searchTerm))
				);
			})
			.map((post) => ({
				post,
				relevanceScore: calculateRelevance(post, term),
			}))
			.sort((a, b) => b.relevanceScore - a.relevanceScore)
			.map((item) => item.post);
	}

	function calculateRelevance(post, searchTerm) {
		let relevanceScore = 0;

		// Prioritize title matching
		if (post.title.toLowerCase().includes(searchTerm)) {
			relevanceScore += 5;
		}

		// Add points for category matching
		if (post.category.toLowerCase().includes(searchTerm)) {
			relevanceScore += 1;
		}

		// Add points for slug matching
		if (post.slug.toLowerCase().includes(searchTerm)) {
			relevanceScore += 2;
		}

		// Add points for description matching
		if (post.description.toLowerCase().includes(searchTerm)) {
			relevanceScore += 1;
		}

		return relevanceScore;
	}

	$: ({ route } = $page.data);

	let open = false;
	let search = false;
	let term = "";
	function toggleSearch() {
		search = search ? false : true;
	}
	function closeSearch() {
		search = false;
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
			src={logo}
			alt="winf-logo"
		/>
	</a>
	<div class="flex items-center justify-center gap-2 w-52">
		<select on:change={({ target }) => goto(target.value)}>
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
<nav
	class="mt-4 py-2 flex flex-row w-full justify-between border-b-4"
>
	{#each Array(8) as _, i}
		<span class="uppercase text-center">menupoint {i}</span>
	{/each}
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
						src={logo}
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
