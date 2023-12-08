<script>
	import { Hamburger } from "svelte-hamburgers";
	import "../app.pcss";
	import Header from "../lib/components/Header.svelte";

	export let data;

	let open;
	function menuToggle() {
		open = !open;
	}
</script>

<Header></Header>
<!-- <Hamburger bind:open></Hamburger> -->
<main class="h-screen bg-slate-200 pt-12">
	<slot />
</main>
