<script>
	import { langIsGerman, modeIsDark } from "$lib/stores.js";
	import Icon from "@iconify/svelte";

	import Switch from "./Switch.svelte";
</script>

<header class=" bg-white h-12">
	<div class=" flex justify-between">
		<div id="socials">
			<a href="/"><Icon icon="mdi-light:home" /></a>
			<a href="/"><Icon icon="mdi-light:home" /></a>
			<a href="/"><Icon icon="mdi-light:home" /></a>
			<a href="/"><Icon icon="mdi-light:home" /></a>
			<a href="/"><Icon icon="mdi-light:home" /></a>
		</div>
		<div class="">
			<Switch
				defaultChecked={$langIsGerman}
				on:checkedChange={(event) => {
					$langIsGerman = event.detail;
				}}
				id="dark-mode"
			/>
		</div>
		<div class="">
			<Switch
				defaultChecked={$modeIsDark}
				on:checkedChange={(event) => {
					$modeIsDark = event.detail;
				}}
				id="dark-mode"
			/>
		</div>
	</div>
	<h1>{$langIsGerman}</h1>
	<h1>{$modeIsDark}</h1>
</header>
