<script>
	import Icon from "@iconify/svelte";
	import { t, locales, locale } from "$lib/translations";

	let menuOpen = true;
	let menuContainer;

	function onWindowClick(e) {
		if (!menuContainer.contains(e.target)) menuOpen = false;
	}

	function onMenuClick() {
		menuOpen = !menuOpen;
	}
</script>

<svelte:window on:click={onWindowClick} />
<ul
	bind:this={menuContainer}
	class="{menuOpen
		? ''
		: 'translate-x-[85%]'} pointer-events-none *:pointer-events-auto lg:translate-x-0 fixed right-0 top-0 lg:w-auto h-screen z-50 lg:sticky lg:h-min grid lg:z-0 grid-cols-[15%_,85%] transition-all min-w-72 lg:min-w-0 lg:hidden overflow-y-scroll"
>
	<button
		class="bg-white dark:bg-slate-800 dark:hover:bg-slate-600 dark:border-slate-700 h-24 w-auto max-w-12 ml-auto shadow-md px-2 rounded-l-2xl self-center border flex justify-center items-center lg:hidden"
		on:click={onMenuClick}
	>
		<Icon
			icon={menuOpen ? "mdi:chevron-right" : "mdi:menu"}
			class="{menuOpen
				? ''
				: ''} text-2xl text-slate-400 transition-transform"
		></Icon>
	</button>

	<div
		class="px-4 border-l-2 flex flex-col gap-4 bg-white dark:bg-slate-800"
	>
		<span class="text-center text-xl mt-6 font-bold border-b w-full">
			{$t("standard.navigation")}
		</span>
		<slot />
	</div>
</ul>
<!-- <div class="lg:hidden block"> -->
<!-- </div> -->
