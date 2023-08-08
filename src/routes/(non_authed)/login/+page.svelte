<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";

	export let data: PageData;

	const { form, errors, constraints, enhance, message } = superForm(data.form);
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex flex-col items-center justify-center">
	<div class="w-full md:w-1/2 lg:w-1/3">
		<form use:enhance method="post" class="px-8 pt-6 pb-8 bg-base-100 shadow-lg">
			<h1 class="font-bold tracking-tight text-2xl mb-8">Sign into your account</h1>
			<div class="mb-4">
				<label class="label" for="username">
					<span class="font-bold">Username</span>
					{#if $errors.username}<span class="text-error">{$errors.username}</span>{/if}
				</label>
				<input
					name="username"
					id="username"
					bind:value={$form.username}
					placeholder="Username"
					aria-label="Username"
					aria-invalid={$errors.username ? "true" : undefined}
					{...$constraints.username}
					required
					class="input input-bordered w-full"
				/>
			</div>
			<div class="mb-4">
				<label class="label" for="password">
					<span class="font-bold">Password</span>
					{#if $errors.password}<span class="text-error">{$errors.password}</span>{/if}
				</label>
				<input
					name="password"
					id="password"
					bind:value={$form.password}
					placeholder="Enter password"
					aria-label="Enter password"
					aria-invalid={$errors.password ? "true" : undefined}
					{...$constraints.password}
					type="password"
					required
					class="input input-bordered w-full"
				/>
			</div>

			<div class="flex items-center justify-center">
				<button class="btn btn-primary w-full mt-4" type="submit"> Sign In </button>
			</div>

			<hr class="my-8" />
			<div class="flex items-center justify-center">
				<a href="/register" class="btn btn-secondary w-full"> Register </a>
			</div>
		</form>

		{#if $message}
			<div class="shadow-lg p-8 bg-error my-8 text-center">
				<span class="text-error-content">{$message}</span>
			</div>
		{/if}
	</div>
</div>
