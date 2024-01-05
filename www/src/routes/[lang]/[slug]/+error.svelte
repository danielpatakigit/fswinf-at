<script>
	import { t, locale } from "$lib/translations";
	import { page } from "$app/stores";

	export let status = $page.status;
</script>

<div class="flex flex-col gap-4 items-center my-36">
	<h1 class="font-bold text-xl">
		{$t("standard.shit.happens")} ({status})
	</h1>
	<p>
		{$t(`standard.${status}`, { default: $t("standard.default") })}
	</p>
	<p>Locale: {$locale} - {$t(`lang.${$locale}`)}</p>
</div>
