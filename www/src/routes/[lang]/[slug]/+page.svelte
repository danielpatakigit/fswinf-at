<script>
	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta
		property="og:type"
		content="article"
	/>
	<meta
		property="og:title"
		content={data.meta.title}
	/>
</svelte:head>

<svelte:component this={data.content} />
<article>
	<!-- Title -->
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p>Published at ({data.meta.date})</p>
	</hgroup>

	<!-- Tags -->
	<div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div>

	<!-- Post -->
	<div class="prose"></div>
</article>