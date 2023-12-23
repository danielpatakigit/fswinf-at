<script>
	import Icon from "@iconify/svelte";
	const images = Object.keys(
		import.meta.glob(
			"/src/lib/assets/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}",
		),
	);

	function getImage(name) {
		return `../../lib/assets/${name}`;
	}
</script>

<section class="bg-green-200">
	<article
		class="border text-center pt-24 min-h-[30rem] flex flex-col"
	>
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
	</article>
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
<section>
	<article>
		<div
			id="featured"
			class="grid grid-cols-4 gap-4"
		>
			<div class="col-span-4 relative">
				<!-- <enhanced:img
					class="object-contains w-full brightness-[40%]"
					src={getImage("placeholder.jpg")}
					alt="featured"
				/> -->
				<div class="absolute inset-0 w-full h-full">
					<div
						class="text-white flex flex-col items-center justify-center gap-2 h-full max-w-sm mx-auto py-8 text-center"
					>
						<span class="mb-auto">featured</span>
						<h2>Lorem ipsum dolor sit.</h2>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Dignissimos nam ipsam molestias! Culpa, porro
							error!
						</span>
						<a
							href="/en/about"
							class="mb-auto"
						>
							Read More
						</a>
					</div>
				</div>
			</div>
			<div class="col-span-3 grid grid-cols-2 border">
				<div class="border flex flex-col gap-4">
					<span class="mt-auto">Lorem, ipsum.</span>
					<h2>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit.
						Pariatur, animi.
					</h2>
					<span>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Blanditiis dicta amet, id similique, omnis architecto quo
						expedita numquam animi facere repudiandae magnam facilis
						necessitatibus commodi?
					</span>
					<div class="mt-auto border flex gap-4">
						<span>Lorem.</span>
						<span>Itaque?</span>
						<span>Eveniet!</span>
					</div>
				</div>
				<!-- <img
					class="h-full object-cover"
					src={getImage("placeholder.jpg")}
					alt="secondaryimg"
				/> -->
			</div>

			<div class="row-span-2 flex flex-col">
				<div></div>
			</div>
			<div class="">lorem</div>
			<div class="">lorem</div>
			<div class="">lorem</div>
		</div>
	</article>
</section>
