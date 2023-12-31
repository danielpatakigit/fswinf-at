<script>
	import { queryContent, getCategoriesAndPages } from "$lib/index.js";
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
	import "../../app.pcss";
	import j from "jquery";
	import { afterUpdate, onMount } from "svelte";

	export let data;

	let socials = [
		{
			name: "Instagram",
			url: "https://www.instagram.com/fswinf/",
			icon: "ri:instagram-fill",
		},
		{
			name: "Telegram",
			url: "https://telegram.me/fswinf",
			icon: "ic:baseline-telegram",
		},
		{
			name: "Facebook",
			url: "https://www.facebook.com/fswinf",
			icon: "ic:baseline-facebook",
		},
		{
			name: "LinkedIn",
			url: "https://www.linkedin.com/company/fswinf/about/",
			icon: "mdi:linkedin",
		},
	];
	let scrollPercentage = 0;
	let outerHeight;
	let innerHeight;
	let scrollY;

	function calculateScrollPercentage() {
		scrollPercentage = (
			scrollY.toFixed(0) /
			(j(document).height() - 800)
		).toFixed(2);
	}

	onMount(() => {
		j(window).scroll(() => {
			calculateScrollPercentage();
		});
	});

	// Update scroll percentage on scroll event
	$: ({ route } = $page.data);
</script>

<ModeWatcher defaultMode={"dark"}></ModeWatcher>
<svelte:window
	bind:outerHeight
	bind:scrollY
	bind:innerHeight
/>

<header class="min-h-[3rem] relative flex justify-between">
	<div
		class="flex gap-2 flex-row items-center justify-center w-52 text-xl"
	>
		{#each socials as social, i}
			<a
				target="_blank"
				href={social.url}
			>
				<Icon icon={social.icon}></Icon>
			</a>
		{/each}
	</div>
	<a href="/{$locale}">
		<img
			class="max-h-12 m-auto"
			src="/src/static/logo.png"
			alt="winf-logo"
		/>
	</a>
	<div class="flex items-center justify-center gap-2 w-52">
		<button
			on:click={toggleMode}
			class=""
		>
			<Icon
				icon={"mdi:theme-light-dark"}
				class="text-xl"
			></Icon>
		</button>
		<a href="/{$locale}/search">
			<Icon
				icon={"mdi:search"}
				class="text-xl"
			></Icon>
		</a>
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
		<!-- <button>
			<Hamburger bind:open></Hamburger>
		</button> -->
	</div>
</header>
<nav class="mt-4 py-2 flex flex-row w-full justify-around">
	{#each getCategoriesAndPages(data.content) as [category, pages]}
		<a
			href="/{$locale}/{pages[0] ? pages[0] : ''}"
			class="uppercase text-sm text-gray-400"
		>
			{category}
		</a>
	{/each}
</nav>
<div class="bg-gray-200 h-1 sticky top-0 z-40">
	<div
		class="h-full bg-green-400 transition-all rounded-r-full"
		style="width: {scrollPercentage * 100 < 8
			? 0
			: scrollPercentage * 110}%;"
		value={scrollPercentage}
	></div>
</div>

<main>
	<slot />
</main>

<section class="bg-green-200">
	<article>
		<footer
			class="flex flex-col border-t-2 border-black mt-4 py-4 gap-2"
		>
			<div class="flex justify-around font-bold">
				{#each getCategoriesAndPages(data.content) as [category, pages]}
					<a
						href="/{$locale}/{pages[0] ? pages[0] : ''}"
						class="capitalize"
					>
						{category}
					</a>
				{/each}
			</div>
			<div
				class="flex flex-row justify-between border-y border-black my-2 py-2"
			>
				<div class="max-w-[10rem] flex justify-center items-center">
					<img
						src="/src/static/logo.png"
						alt="logo"
					/>
				</div>
				<div
					class="flex gap-4 flex-row items-center justify-center w-52 text-3xl"
				>
					{#each socials as social, i}
						<a
							target="_blank"
							href={social.url}
						>
							<Icon icon={social.icon}></Icon>
						</a>
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
