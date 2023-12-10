<script>
	import Icon from "@iconify/svelte";
</script>

<section class="border text-center pt-24 min-h-[40rem] flex flex-col">
	<div class="">
		<div>
			<h1 class="text-3xl font-bold">
				Fachschaft Wirtschaftsinformatik und Data Science
			</h1>
			<h2>
				und Studienvertretung für Wirtschaftsinformatik und Data
				Science an der TU Wien
			</h2>
		</div>
		<div></div>
	</div>
</section>
<section
	id="quick-links"
	class="bg-blue-200"
>
	<article class="">
		<h2 class="font-bold text-xl">Quick Links</h2>
		<div class="grid grid-cols-4">
			{#each Array(4) as _, i}
				<div
					class="border p-4 flex justify-between items-center bg-white"
				>
					<span>Lorem</span>
					<Icon icon="mdi:arrow"></Icon>
				</div>
			{/each}
		</div>
	</article>
</section>
