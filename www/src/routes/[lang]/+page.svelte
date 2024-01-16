<script>
	import { fly } from "svelte/transition";
	import { queryContent } from "$lib/index.js";
	import { t, locales, locale } from "$lib/translations";

	import Icon from "@iconify/svelte";
	import { quintOut } from "svelte/easing";
	export let data;

	$: allPosts = queryContent(data.content, "posts", "*", $locale);
	$: posts = allPosts.slice(0, 6);
</script>

<section class="bg-winfbaige-300 dark:bg-slate-950">
	<article
		class="py-24 grid grid-cols-1 md:grid-cols-2 gap-12 z-20 col-start-1 row-start-1"
	>
		<div class="flex flex-col gap-3 order-2 md:order-1">
			<h1
				class="text-3xl md:text-4xl leading-9 text-balance font-bold font-header"
			>
				Hey, we are the FS Winf!
			</h1>
			<h2 class="mt-2 text-balance md:text-lg flex flex-col">
				<span class="font-bold">
					Fachschaft Wirtschaftsinformatik und Data Science
				</span>
				<span>
					Studienvertretung für Wirtschaftsinformatik und Data Science
					an der TU Wien
				</span>
			</h2>
			<div class="flex gap-4">
				<a
					class="px-4 py-2 border-winfblue-700 border-2 hover:border-winfblue-100 bg-winfblue-200 hover:bg-winfblue-100 font-semibold rounded-full"
					href="/{$locale}"
				>
					Start Exploring
				</a>
			</div>
			<p class="underline mt-8 font-semibold text-sm">
				Still in development! Only for demonstration purposes!
			</p>
			<!-- <iframe
				title="calendar"
				style="border-width: 0;"
				src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showCalendars=0&amp;mode=WEEK&amp;height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=odettgo4tj2tm4ioih85tfr8ag%40group.calendar.google.com&amp;src=fachschaft%40winf.at&amp;color=%23853104&amp;ctz=Europe%2FVienna"
				width="800"
				height="800"
				frameborder="0"
				scrolling="no"
			></iframe> -->
		</div>
		<div class="order-1">
			<img
				class="rounded-2xl"
				src="/winf_hero.jpg"
				alt="winf_hero"
			/>
		</div>
		<!-- <div class="max-w-80 mx-auto">
			<img
				src={hero.cover}
				alt="placeholder"
			/>
		</div>
		<div class="flex gap-4 flex-col text-center">
			<div class="flex flex-col gap-4 items-center">
				<h1 class="text-2xl font-bold">
					{hero.title}
				</h1>
				<p>{hero.description}</p>
				<a
					href="/{$locale}/{hero.slug}"
					class="px-4 py-2 w-min bg-black text-white rounded-full font-bold"
				>
					About
				</a>
			</div>
			<div class="">
				<h2 class="font-bold">Statistics</h2>
				<ul class="">
					{#each Array(4) as _, i}
						<li class="flex justify-between">
							<span>Statistic name {i}</span>
							<span>1234</span>
						</li>
					{/each}
				</ul>
			</div>
		</div> -->
	</article>
</section>

<section>
	<article class="mb-12">
		<div class="border-b-2 py-3 mt-2">
			<h2 class="text-xl font-semibold">
				<a
					href="/{$locale}/{posts[0].slug}"
					class=" flex items-center gap-1"
				>
					<span>Posts</span>
					<Icon
						icon="mdi-chevron-right"
						class="text-xl"
					/>
				</a>
			</h2>
		</div>
		<div
			class="mt-4 grid grid-cols-1 gap-y-12 sm:grid-cols-2 md:grid-cols-3 gap-6"
		>
			{#each posts as post, i}
				<a
					href="/{$locale}/{post.slug}"
					class="flex flex-col gap-3 shadow-md bg-white rounded-lg hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
				>
					{#if post.cover}
						<img
							class="aspect-video object-cover rounded-t-lg"
							src="/{post.cover}"
							alt="alt:{post.cover}"
						/>
					{:else}
						<img
							class="aspect-video object-cover rounded-t-lg"
							src="/logo_black.svg"
							alt="coverimg"
						/>
					{/if}

					<div class="flex flex-col p-3">
						<h2 class="font-normal text-xl">
							{post.title}
						</h2>
						<span class="text-xs font-bold text-winfgreen-500">
							{post.date}
						</span>
						<p
							class="font-base text-sm text-slate-500 line-clamp-3 mt-3"
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
				<button class="font-medium">All posts</button>
				<Icon
					icon="mdi-chevron-right"
					class="text-xl"
				/>
			</a>
		</div>
	</article>
</section>
