<script>
	import Icon from "@iconify/svelte";
	import placeholder from "$lib/assets/placeholder.jpg";
</script>

<section class="bg-green-200">
	<article class="py-24 grid grid-cols-2 gap-4">
		<div class="">
			<h1 class="text-2xl font-bold">
				Fachschaft Wirtschaftsinformatik und Data Science
			</h1>
			<h2>
				und Studienvertretung für Wirtschaftsinformatik und Data
				Science an der TU Wien
			</h2>
		</div>
		<div>
			<img
				src={placeholder}
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
			{#each Array(7) as _, i}
				<div class={i === 0 ? "row-span-3" : ""}>
					Lorem ipsum dolor sit. {i}
				</div>
			{/each}
		</div>
	</article>
</section>
