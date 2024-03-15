<script>
	import { afterNavigate } from "$app/navigation";
	import { t, locales, locale } from "$lib/translations";

	let anchorLinks = [];

	afterNavigate(() => {
		anchorLinks = updatePageTOC();
	});

	function updatePageTOC() {
		const headers = document.querySelectorAll("h2, h3, h4, h5, h6");
		const newArray = [];

		headers.forEach(function (item) {
			const href = "#" + item.id;
			const text = item.innerText;
			const current = false;
			newArray.push({ href, current, text, item });
		});

		return newArray;
	}

	function onWindowScroll() {
		let lastTrueIndex = -1;

		anchorLinks.forEach((link, i) => {
			if (link.item.getBoundingClientRect().top < 210) {
				lastTrueIndex = i;
			}
		});

		anchorLinks.forEach((link, i) => {
			link.current = i === lastTrueIndex;
		});
		const temp = [...anchorLinks];
		anchorLinks = [...temp];
	}

	let menuOpen = false;
	let menuContainer;

	function onWindowClick(e) {
		if (!menuContainer.contains(e.target)) menuOpen = false;
	}

	function onMenuClick() {
		menuOpen = !menuOpen;
	}
</script>

<svelte:window on:scroll={onWindowScroll} />

<ul class="flex-col text-sm h-min font-header">
	<span class="capitalize font-semibold text-base">
		{$t("standard.on_this_page")}
	</span>
	<div
		class="flex flex-col mt-2 font-normal text-sm bg-white dark:bg-transparent w-full"
		id="on-this-page"
	>
		{#if anchorLinks.length > 0}
			{#each anchorLinks as anchor, i}
				<a
					class="{anchor.current
						? 'font-bold bg-slate-100 dark:bg-slate-800 border-winfblue-400'
						: 'font-normal dark:border-slate-700 text-slate-500 '} py-2 pl-2 pr-2 border-l-2"
					href={anchor.href}
				>
					{anchor.text}
				</a>
			{/each}
		{:else}
			<span class="font-normal">{$t("standard.no_headers")}</span>
		{/if}
	</div>
</ul>
