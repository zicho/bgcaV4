<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors, constraints, enhance, message } = superForm(data.form);
</script>

<div class="prose mb-8">
	<h1>Import your BoardGameGeek Collection</h1>
	<p>
		Instead of manually adding your games, you can import them from BGG if you have an account
		there. Enter your BGG nickname below to import your collection!
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
				aria-invalid={$errors.nickname ? 'true' : undefined}
				class="input input-bordered w-full"
				{...$constraints.nickname}
				required
			/>
			<label for="signature" class="label">
				<span class="label-text-alt">Make sure you spell it right!</span>
			</label>
		</div>
		<button type="submit" class="btn btn-primary w-full mt-8">Import</button>
	</form>
</div>
