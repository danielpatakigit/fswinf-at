<script>
	import { fly, slide } from "svelte/transition";
	import { queryContent } from "$lib/index.js";
	import { t, locales, locale } from "$lib/translations";

	import Icon from "@iconify/svelte";
	import {
		backIn,
		bounceIn,
		circIn,
		elasticIn,
		elasticInOut,
		quartIn,
		quintIn,
		quintOut,
		sineIn,
	} from "svelte/easing";
	export let data;
	import { socials } from "$lib/content/sorting.js";
	import { onMount } from "svelte";

	$: allPosts = queryContent(data.content, "posts", "*", $locale);
	$: posts = allPosts.slice(0, 6);

	let loaded = false;
	onMount(() => {
		loaded = true;
	});
</script>

<section class=" dark:bg-slate-900">
	<article class="flex flex-col py-12 gap-16">
		{#if loaded}
			<div class="text-center flex flex-col items-center gap-4">
				<div
					class="rounded-full italic font-medium text-white py-2 px-4 font-header bg-winfgreen-400"
				>
					Funny text here
				</div>
				<h1
					class="text-balance text-5xl md:text-7xl font-semibold leading-none tracking-tight"
				>
					{@html $t("standard.we_are_the")}
					<span class="text-winfgreen-500 font-header">FS Winf!</span>
				</h1>
				<h2
					class="mt-2 text-balance flex flex-col text-slate-700 dark:text-slate-200"
				>
					{@html $t("standard.fswinf_description")}
				</h2>
			</div>
			<!-- <div
				in:fly={{
					delay: 0,
					duration: 1400,
					x: 0,
					y: 50,
					opacity: 0,
					easing: quintIn,
				}}
				class="grid gird-cols-1 md:grid-cols-2 gap-4"
			>
				<div
					class="grid grid-cols-1 md:grid-cols-2 grid-rows-3 lg:grid-rows-[44%,_28%,_28%,] gap-4"
				>
					<div class="md:col-span-2 w-full h-full">
						<img
							class="rounded-2xl object-cover object-bottom w-full h-full"
							src="/winf_hero.jpg"
							alt="winf_hero"
						/>
					</div>
					<div class="grid grid-cols-2 grid-rows-2 gap-4 md:gap-3">
						{#each socials as social, i}
							<a
								class="flex items-center text-black justify-center md:text-3xl rounded-2xl bg-slate-100 hover:bg-slate-200 group aspect-square md:aspect-auto text-5xl"
								target="_blank"
								href={social.url}
							>
								<Icon
									class="group-hover:rotate-12 transition-transform"
									icon={social.icon}
								></Icon>
							</a>
						{/each}
					</div>
					<div
						class="row-span-2 p-4 bg-winfblue-500 text-white rounded-2xl flex flex-col justify-between"
					>
						<div class="text-6xl">50</div>
						<div class="font-semibold text-md">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Unde sunt error facilis.
						</div>
					</div>
					<div
						class="p-4 bg-slate-100 text-black rounded-2xl flex flex-col justify-between"
					>
						<div class="text-6xl">50</div>
						<div class="font-base text-md">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Unde sunt error facilis.
						</div>
					</div>
				</div>
				<div class="grid grid-cols-2 grid-rows-[28%,_28%,_44%] gap-4">
					<div
						class="row-span-2 p-4 bg-winfgreen-500 text-white rounded-2xl flex flex-col justify-between"
					>
						<div class="text-6xl">50</div>
						<div class="font-semibold text-md">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Unde sunt error facilis.
						</div>
					</div>
					<div class="grid grid-cols-2 grid-rows-2 gap-4 md:gap-3">
						{#each socials as social, i}
							<a
								class="flex items-center text-black justify-center text-3xl rounded-2xl bg-slate-100 hover:bg-slate-200 group"
								target="_blank"
								href={social.url}
							>
								<Icon
									class="group-hover:rotate-12 transition-transform"
									icon={social.icon}
								></Icon>
							</a>
						{/each}
					</div>

					<div
						class="p-4 bg-slate-100 text-black rounded-2xl flex flex-col justify-between"
					>
						<div class="text-6xl">50</div>
						<div class="font-base text-md line-clamp-2">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Unde sunt error facilis.
						</div>
					</div>
					<div class="col-span-2 w-full h-full">
						<img
							class="rounded-2xl object-cover object-bottom w-full h-full"
							src="/winf_hero.jpg"
							alt="winf_hero"
						/>
					</div>
				</div>
			</div> -->

			<!-- <iframe
				title="calendar"
				style="border-width: 0;"
				src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showCalendars=0&amp;mode=WEEK&amp;height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=odettgo4tj2tm4ioih85tfr8ag%40group.calendar.google.com&amp;src=fachschaft%40winf.at&amp;color=%23853104&amp;ctz=Europe%2FVienna"
				width="800"
				height="800"
				frameborder="0"
				scrolling="no"
			></iframe> -->
		{/if}
	</article>
</section>

<section>
	<article class="mb-12 mt-36 flex flex-col gap-12">
		<div class="flex flex-col items-center gap-6 justify-center">
			<h2 class="text-3xl md:text-5xl font-semibold">
				<a
					href="/{$locale}/{posts[0].slug}"
					class="flex items-center gap-1 underline decoration-winfgreen-500 underline-offset-4 group"
				>
					<span>{$t("standard.news")}</span>
					<Icon
						class="group-hover:-rotate-45 group-hover:text-winfgreen-500"
						icon="gg:arrow-right"
					></Icon>
				</a>
			</h2>
			<span
				class="text-center text-balance text-slate-700 dark:text-slate-200"
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
				repellendus incidunt perspiciatis modi saepe minima distinctio
				quisquam possimus autem quibusdam.
			</span>
		</div>
		<div
			class="mt-4 grid grid-cols-1 gap-y-12 sm:grid-cols-2 md:grid-cols-3 gap-6"
		>
			{#each posts as post, i}
				<a
					href="/{$locale}/{post.slug}"
					class="flex flex-col bg-slate-100 rounded-2xl hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 group"
				>
					{#if post.cover}
						<img
							class="aspect-video object-cover rounded-t-2xl"
							src="/{post.cover}"
							alt="alt:{post.cover}"
						/>
					{:else}
						<img
							class="aspect-video object-contain rounded-t-2xl p-4"
							src="/fswinf_favicon_dark.png"
							alt="coverimg"
						/>
					{/if}

					<div class="flex flex-col px-4 pt-2 pb-5 relative">
						<h2 class="font-semibold text-2xl text-balance">
							{post.title}
						</h2>
						<span
							class="text-xs font-semibold rounded-tr-lg w-fit -top-5 py-1 px-4 bg-slate-100 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 left-0 absolute dark:bg-slate-800"
						>
							{post.date}
						</span>
						<p
							class="font-base text-sm text-slate-700 dark:text-slate-200 line-clamp-3 mt-2"
						>
							{post.description}
						</p>
						<div
							class="mt-auto flex gap-2 text-xs text-winfgreen-400"
						>
							<!-- <span>•</span>
							<span>{i} minute read</span> -->
						</div>
					</div>
				</a>
			{/each}
		</div>
		<div class="flex justify-center items-center mt-6">
			<a
				href="/{$locale}/{posts[0].slug}"
				class="border-2 rounded-full py-2 px-4 shadow-sm flex items-center gap-1 hover:opacity-75"
			>
				<button class="font-medium">
					{$t("standard.all_posts")}
				</button>
				<Icon
					icon="mdi-chevron-right"
					class="text-xl"
				/>
			</a>
		</div>
	</article>
</section>
