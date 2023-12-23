<script>
	import { t, locales, locale } from "$lib/translations";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { writable } from "svelte/store";
	import {
		ModeWatcher,
		toggleMode,
		mode,
		setMode,
		resetMode,
	} from "mode-watcher";
	import Icon from "@iconify/svelte";
	import { fade } from "svelte/transition";
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
	let results = [];
	$: if (data.posts) {
		results = data.posts
			.filter((post) => {
				const searchTerm = term.toLowerCase();

				return (
					post.lang === $locale &&
					(post.title.toLowerCase().includes(searchTerm) ||
						post.description.toLowerCase().includes(searchTerm) ||
						post.categories.some((category) =>
							category.toLowerCase().includes(searchTerm),
						) ||
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
		if (
			post.categories.some((category) =>
				category.toLowerCase().includes(searchTerm),
			)
		) {
			relevanceScore += 3;
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
		<button>
			<Hamburger bind:open></Hamburger>
		</button>
	</div>
	<nav
		class=" {open ? 'visible' : 'invisible'}
		absolute bg-white dark:bg-black grid grid-cols-3 gap-2 border p-4 h-[90vh] mx-auto sm:h-auto top-[100%] w-screen max-w-full"
	>
		{#each Array(8) as _, i}
			<a
				href="/{$locale}/about"
				class=" flex gap-4 border p-2 relative group/tooltip hover:cursor-pointer"
			>
				<div
					class="flex items-center justify-center aspect-squares w-24"
				>
					<Icon
						icon="mdi:home"
						class="text-4xl"
					></Icon>
				</div>
				<div class="flex flex-col gap-1">
					<span
						href="/"
						class="font-bold"
					>
						Lorem ipsum dolor sit amet.
					</span>
				</div>
				<span
					class="font-light absolute z-[10] bg-black text-white text-center py-2 px-4 rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity invisible group-hover/tooltip:visible top-[110%]"
				>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</span>
			</a>
		{/each}
		<div></div>
	</nav>
</header>

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

<!-- <a href="/{$locale}">{$t("menu.home")}</a>
<a href="/{$locale}/about">{$t("menu.about")}</a>
<hr />
<h2>Links to posts</h2>
<ul>
	{#each filteredPosts as post}
		<li>
			<a href="/{post.lang}/{post.slug}">
				{post.title}
				<span>{post.date}</span>
			</a>
		</li>
	{/each}
</ul>
<hr />
{$t("menu.notification", { count: $count })}
<br />
<button
	on:click={() => {
		if ($count) $count -= 1;
	}}
>
	–
</button>
<button
	on:click={() => {
		$count += 1;
	}}
>
	+
</button> -->
<main>
	<slot />
</main>
