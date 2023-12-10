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
	import logo from "/src/static/logo_Marginless.png";
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
	let filteredPosts = [];
	$: if (data.posts) {
		filteredPosts = data.posts.filter(
			(post) => post.lang === $locale,
		);
	}

	const count = writable(2);

	$: ({ route } = $page.data);

	let open;
	let search = false;
	function toggleSearch() {
		search = !search;
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
	<img
		class="max-h-12 m-auto"
		src={logo}
		alt="winf-logo"
	/>
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
				href="##"
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
						href="##"
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
	<div class="border">
		<h2>Search for anything</h2>
		<div class="flex flex-row">
			<Icon icon="mdi:search"></Icon>
			<input type="text" />
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
