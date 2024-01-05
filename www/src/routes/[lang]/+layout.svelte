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
	let scrollY;
	let innerHeight;

	let settingsContainer;
	let settingsOpen = false;

	$: ({ route } = $page.data);

	onMount(() => {
		j(window).scroll(() => {
			calculateScrollPercentage();
		});
	});

	function calculateScrollPercentage() {
		const temp = (
			scrollY.toFixed(0) /
			(j(document).height() - innerHeight)
		).toFixed(2);

		scrollPercentage = temp > 1 ? 1 : temp;
		// if percentage is smaller then 10 or bigger than 90 snap to either 0 or 100 to avoid lagg from the scroll function
		scrollPercentage =
			scrollPercentage * 100 < 8
				? 0
				: scrollPercentage * 100 > 90
					? 100
					: scrollPercentage * 100;
	}

	function onWindowClick(e) {
		if (!settingsContainer.contains(e.target)) settingsOpen = false;
	}

	function onSettingsClick() {
		settingsOpen = !settingsOpen;
	}
</script>

<ModeWatcher defaultMode={"dark"}></ModeWatcher>
<svelte:window
	bind:scrollY
	bind:innerHeight
	on:click={onWindowClick}
/>

<header
	class="flex justify-between relative gap-4 px-2 pt-1 pb-1 shadow-lg"
>
	<a
		href="/{$locale}"
		class="flex items-center min-w-fit justify-center absolute md:relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:transform-none md:inset-auto
		"
	>
		<img
			class="h-10 m-auto"
			src="/logo.png"
			alt="winf-logo"
		/>
	</a>

	<nav
		class="absolute bg-white left-0 -bottom-12 w-full h-12 md:h-auto overflow-auto items-center flex flex-row gap-3 md:relative md:bottom-0 justify-center shadow-md md:shadow-none"
	>
		{#each getCategoriesAndPages(data.content) as [category, pages]}
			<a
				href="/{$locale}/{pages[0] ? pages[0] : ''}"
				class="{pages[0]
					? 'hover:bg-gray-100'
					: 'line-through'} capitalize px-2
				sm:px-4 py-2 font-medium rounded-md"
			>
				{category}
			</a>
		{/each}
	</nav>
	<div
		bind:this={settingsContainer}
		class="relative flex flex-row bg-white ml-auto gap-2"
	>
		<button
			tabindex="0"
			on:click={onSettingsClick}
			class="flex gap-2 border-2 px-2 sm:px-4 py-2 font-semibold rounded-md hover:bg-gray-100"
		>
			<span class="hidden sm:block">Settings</span>
			<Icon
				icon="quill:cog"
				class="text-2xl z-50"
			></Icon>
		</button>
		<div
			class="{settingsOpen
				? 'visible'
				: 'invisible'} shadow-md p-1 absolute rounded z-40 top-12 w-48 right-0 border bg-white *:flex *:items-center *:gap-2 *:w-full *:h-10 hover:*:bg-gray-200 *:rounded-md *:p-2"
		>
			<button
				on:click={toggleMode}
				class=""
			>
				<Icon
					icon={"mdi:theme-light-dark"}
					class="text-xl"
				></Icon>
				<span>Light Mode</span>
			</button>
			<a
				href="/{$locale}/search"
				class=""
			>
				<Icon
					icon={"mdi:search"}
					class="text-xl"
				></Icon>
				<span>Search</span>
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
						{$t(`lang.${lc}`)}
					</option>
				{/each}
			</select>
			<!-- <div
				class="flex gap-2 flex-row items-center justify-center text-xl"
			>
				{#each socials as social, i}
					<a
						target="_blank"
						href={social.url}
					>
						<Icon icon={social.icon}></Icon>
					</a>
				{/each}
			</div> -->
		</div>
	</div>
</header>
<div
	class=" {scrollY > 80
		? 'h-[4px]'
		: 'h-[0px] md:h-[1px]'} bg-gray-200 sticky top-0 z-20 transition-all"
>
	<div
		class="h-full bg-green-400 transition-all"
		style="width: {scrollPercentage}%;"
	></div>
</div>

<main class="pt-12 md:pt-0">
	<slot />
</main>

<section class="bg-gray-200">
	<article>
		<footer class="flex flex-col mt-4 py-4 gap-2">
			<div
				class="grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-2 font-medium text-center"
			>
				{#each getCategoriesAndPages(data.content) as [category, pages]}
					<a
						href="/{$locale}/{pages[0] ? pages[0] : ''}"
						class="capitalize hover:bg-gray-100 py-2 px-2 rounded-md"
					>
						{category}
					</a>
				{/each}
			</div>
			<div
				class="flex flex-row justify-between border-y border-gray-300 my-2 py-2"
			>
				<div class="max-w-[10rem] flex justify-center items-center">
					<img
						src="/logo.png"
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
