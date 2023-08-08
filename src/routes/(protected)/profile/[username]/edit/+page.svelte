<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";

	export let data: PageData;

	const { form, errors, constraints, enhance, message } = superForm(data.form);
</script>

<div class="prose">
	<div class="mb-4">
		<h1>Editing profile</h1>
		<strong>NOTE: All info here will be visible on your profile</strong>
	</div>
	<hr class="mt-0 mb-4" />
	<div class="w-full">
		<form use:enhance method="post">
			<div class="form-control">
				<label for="description" class="label px-0">
					<span class="font-bold">Description</span>
					{#if $errors.description}<span class="text-error">{$errors.description}</span>{/if}
				</label>
				<textarea
					name="description"
					id="description"
					bind:value={$form.description}
					placeholder="Description"
					aria-label="Description"
					aria-invalid={$errors.description ? "true" : undefined}
					{...$constraints.description}
					class="textarea textarea-bordered h-36 w-full"
				/>
				<label for="description" class="label">
					<span class="label-text-alt">This text introduces you to other users on this site</span>
				</label>
				<div>
					<label class="label" for="signature">
						<span class="font-bold">Signature</span>
						{#if $errors.signature}<span class="text-error">{$errors.signature}</span>{/if}
					</label>
					<input
						name="signature"
						id="signature"
						bind:value={$form.signature}
						placeholder="signature"
						aria-label="signature"
						aria-invalid={$errors.signature ? "true" : undefined}
						{...$constraints.signature}
						class="input input-bordered w-full"
					/>
					<label for="signature" class="label">
						<span class="label-text-alt">Your signature gets added to posts you make</span>
					</label>
				</div>
			</div>
			<button type="submit" class="btn btn-primary w-full mt-8">Save</button>
		</form>
	</div>
</div>
