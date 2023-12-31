<script>
	import { queryContent } from "$lib/index.js";
	import { t, locales, locale } from "$lib/translations";

	import Icon from "@iconify/svelte";
	export let data;

	$: allContent = queryContent(data.content, "posts", "*", $locale);
	$: hero = allContent[0];
	$: posts = allContent.slice(1, 7);
</script>

<section class="bg-green-200">
	<article class="py-24 grid grid-cols-2 gap-4">
		<div class="">
			<img
				src={hero.cover}
				alt="placeholder"
			/>
		</div>
		<div class="flex gap-4 flex-col">
			<div>
				<h1 class="text-2xl font-bold">
					{hero.title}
				</h1>
				<p>{hero.description}</p>
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
	<article>
		<div class="border-b-2 py-4">
			<h2 class="text-xl font-bold">Posts</h2>
		</div>
		<div class="grid grid-cols-3 gap-4 grid-rows-3 grid-flow-dense">
			{#each posts as post, i}
				<a
					href="/{$locale}/{post.slug}"
					class="flex flex-col gap-4"
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
							src="/src/static/logo.png"
							alt="coverimg"
						/>
					{/if}

					<div class="flex flex-col gap-2">
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
	</article>
</section>
