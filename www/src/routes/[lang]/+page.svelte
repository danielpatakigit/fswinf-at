<script>
	import { queryContent } from "$lib/index.js";
	import { t, locales, locale } from "$lib/translations";

	import Icon from "@iconify/svelte";
	export let data;

	$: allPosts = queryContent(data.content, "posts", "*", $locale);
	$: hero = allPosts[0];
	$: posts = allPosts.slice(1, 7);
</script>

<section class="bg-green-200">
	<article class="py-24 grid grid-cols-1 gap-12">
		<div class="max-w-80 mx-auto">
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
		</div>
	</article>
</section>

<section>
	<article class="mb-12">
		<div class="border-b-2 py-3 mt-2">
			<h2 class="text-xl font-bold">
				<a
					href="/{$locale}/{hero.slug}"
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
					class="flex flex-col gap-3 shadow-md"
				>
					{#if post.cover}
						<img
							class="aspect-video object-cover"
							src={post.cover}
							alt="coverimg"
						/>
					{:else}
						<img
							class="aspect-video object-cover"
							src="/logo.png"
							alt="coverimg"
						/>
					{/if}

					<div class="flex flex-col gap-2 p-2">
						<h2 class="font-bold text-xl text-black">
							{post.title}
						</h2>
						<p class="font-light text-sm text-gray-400 line-clamp-2">
							{post.description}
						</p>
						<div class="mt-auto flex gap-2 text-xs text-green-600">
							<span>{post.date}</span>
							<span>•</span>
							<span>{i} minute read</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
		<div class="flex justify-center items-center mt-6">
			<a
				href="/{$locale}/{hero.slug}"
				class="border-2 rounded-full py-2 px-4 shadow-sm flex items-center gap-1"
			>
				<span class="font-bold">All posts</span>
				<Icon
					icon="mdi-chevron-right"
					class="text-xl"
				/>
			</a>
		</div>
	</article>
</section>
