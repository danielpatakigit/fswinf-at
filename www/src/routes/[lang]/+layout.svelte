<script>
	import { t, locales, locale } from "$lib/translations";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { writable } from "svelte/store";

	import "../../app.pcss";

	import {
		ModeWatcher,
		toggleMode,
		mode,
		setMode,
		resetMode,
	} from "mode-watcher";

	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";

	export let data;
	let filteredPosts = [];
	$: if (data.posts) {
		filteredPosts = data.posts.filter(
			(post) => post.lang === $locale,
		);
	}

	const count = writable(2);

	$: ({ route } = $page.data);
</script>

<ModeWatcher defaultMode={"dark"}></ModeWatcher>

<a href="/{$locale}">{$t("menu.home")}</a>
<a href="/{$locale}/about">{$t("menu.about")}</a>
<hr />
<br />
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
<br />
<br />
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
</button>
<hr />
<slot />
<br />
<select on:change={({ target }) => goto(target.value)}>
	{#each $locales as lc}
		<option
			value="/{lc}{route}"
			selected={lc === $locale}
		>
			{$t(`lang.${lc}`)}
		</option>
	{/each}
</select>
<hr />
<br />
<button on:click={toggleMode}>
	<Icon
		icon={"mdi:theme-light-dark"}
		class="text-4xl"
	></Icon>
</button>
