<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	import PageHeaderToolbar from "$lib/components/ui/PageHeaderToolbar.svelte";
	import { onMount } from "svelte";

	export let data: PageData;

	const { form, errors, constraints, enhance, delayed } = superForm(data.form, {
		delayMs: 0
	});
</script>

<PageHeaderToolbar
	title="Import your BoardGameGeek collection"
	subheader="Save yourself the hassle!"
/>

<div class="prose">
	<p>
		Instead of manually adding your games, you can import them from BGG if you have an account
		there. Enter your BGG nickname below to import your collection!
	</p>
	<p>
		<strong>Note: </strong> This feature uses an
		<a href="https://bgg-json.azurewebsites.net/" target="_blank">external API</a>. If you
		experience issues using this feature, please make sure that service (or BoardGameGeek itself) is
		working properly.
	</p>
</div>

<div class="w-full">
	<form use:enhance method="post">
		<div class="form-control">
			<label class="label px-0" for="nickname">
				<span class="font-bold">BGG nickname</span>
				{#if $errors.nickname}<span class="text-error">{$errors.nickname}</span>{/if}
			</label>
			<input
				name="nickname"
				id="nickname"
				bind:value={$form.nickname}
				placeholder="Enter nickname"
				aria-label="Enter nickname"
				aria-invalid={$errors.nickname ? "true" : undefined}
				class="input input-bordered w-full"
				{...$constraints.nickname}
				required
			/>
			<label for="signature" class="label">
				<span class="label-text-alt">Make sure you spell it right!</span>
			</label>
		</div>

		<button disabled={$delayed} type="submit" class="btn btn-primary w-full my-8">
			{@html !$delayed ? "Import" : '<i class="fa-2xl fas fa-cog fa-spin"></i>'}</button
		>
		<i class="mt-8"
			><strong>Note: </strong>If your collection is large, this may take a while. Be patient.</i
		>
	</form>
</div>
