<script>
	import { t, locale } from "$lib/translations";
	import { page } from "$app/stores";

	export let status = $page.status;
</script>

<div class="flex flex-col font-bold text-2xl">
	<h1>{$t("standard.shit.happens")} ({status})</h1>
	<p>
		{$t(`standard.${status}`, { default: $t("standard.default") })}
	</p>
	<br />
	<br />
	{$locale} - {$t(`lang.${$locale}`)}
</div>
