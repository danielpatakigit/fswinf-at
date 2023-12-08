<script>
	export let data;
	console.log(data);
</script>

<h1>Welcome to SvelteKit</h1>
<a href="/test">Link to test</a>

{#each data.posts as post}
	<div>{JSON.stringify(post)}</div>
	<a href={post.slug}>Link to the post</a>
	<hr />
{/each}
