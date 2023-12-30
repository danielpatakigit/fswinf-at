<script>
	import { queryContent } from "$lib/index.js";
	import { t, locales, locale } from "$lib/translations";

	import Icon from "@iconify/svelte";
	export let data;

	$: posts = queryContent(data.content, "posts", "*", $locale);
</script>

<section class="bg-green-200">
	<article class="py-24 grid grid-cols-2 gap-4">
		<div class="">
			<h1 class="text-2xl font-bold">
				Fachschaft Wirtschaftsinformatik und Data Science
			</h1>
			<h2>
				<pre>
					{JSON.stringify(data.content, null, " ")}
				</pre>
			</h2>
		</div>
		<div>
			<img
				src="/src/static/tree.webp"
				alt="placeholder"
			/>
		</div>
	</article>
</section>
<section>
	<article>
		<div class="border-b-2 py-4">
			<h2 class="text-xl font-bold">Posts</h2>
		</div>
		<div class="grid grid-cols-3 gap-4 grid-rows-3 grid-flow-col">
			{#each posts as post, i}
				<pre class={i === 0 ? "row-span-3" : ""}>
{JSON.stringify(post, null, "  ")}
				</pre>
				<img
					src={post.cover}
					alt="coverimg"
				/>
			{/each}
		</div>
	</article>
</section>
