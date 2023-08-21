<script lang="ts">
	import Checkbox from "$lib/components/form/Checkbox.svelte";
	import PageHeaderToolbar from "$lib/components/ui/PageHeaderToolbar.svelte";
	import { superForm } from "sveltekit-superforms/client";

	import type { PageData } from "./$types";
	import RadioButton from "$lib/components/form/RadioButton.svelte";
	import type { IRadioButtonOpts } from "$lib/interfaces/components/IRadioButtonOpts";
	import { page } from "$app/stores";
	import { EVENT_TYPE } from "$lib/enums/EVENT_TYPE";

	const gameIdQueryParam = $page.url.searchParams.get("game_id");

	export let data: PageData;

	const { enhance, errors } = superForm(data.addEventForm);

	const {
		form: searchForm,
		errors: searchErrors,
		constraints: searchConstraints
	} = superForm(data.searchForm);

	$: games = data.games;

	const opts: IRadioButtonOpts[] = [
		{
			title: "Open",
			tooltip: "Anyone may join",
			checked: true,
			id: EVENT_TYPE.OPEN
		},
		{
			title: "Friends only",
			tooltip: "Anyone on your friends list may join",
			id: EVENT_TYPE.FRIENDS
		},
		{
			title: "Collaborative",
			tooltip: "Anyone invited may invite others",
			id: EVENT_TYPE.COLLAB
		},
		{
			title: "Closed",
			tooltip: "Only invited players may join",
			id: EVENT_TYPE.CLOSED
		}
	];
</script>

<PageHeaderToolbar title="Creating new event" />

<article class="prose">
	<h2>Step 1: Initial setup</h2>
	<p>
		Choose game(s), event type and invite players. If more than one game is chosen, attendees will
		be able to vote on what to play. Choose time, place and other details in next step.
	</p>
</article>

<div class="divider" />

<article class="w-full md:w-1/2 lg:w-1/3">
	<section class="mb-8">
		<h2 class="text-2xl font-semibold mb-4">Add game(s)</h2>
		<form
			id="search"
			action="{gameIdQueryParam ? `?game_id=${gameIdQueryParam}&/search` : '?/search'} "
			class="flex flex-row"
		>
			<input
				bind:value={$searchForm.query}
				name="query"
				type="text"
				class="input input-bordered w-full"
				placeholder="Search"
				{...$searchConstraints.query}
			/>
			<button class="btn btn-primary" type="submit">Search</button>
		</form>
		{#if $searchErrors.query}<span class="label-text text-error">{$searchErrors.query}</span>{/if}
	</section>
	<form use:enhance id="event_data" method="post" action="?/confirm">
		<section class="space-y-4">
			{#each games as game}
				<Checkbox
					title={game.name}
					id={`game_id-${game.id}`}
					checked={gameIdQueryParam === game.id.toString()}
					name="ids"
					value={game.id}
				/>
			{/each}
		</section>
		<div class="divider"></div>
		<section class="space-y-4 mt-4">
			<h2 class="text-2xl font-semibold">Event type</h2>

			<RadioButton {opts} id="eventType" />
		</section>
	</form>
</article>
<div class="divider" />

{#if $errors.ids?._errors}<span class="label-text text-error">{$errors.ids?._errors}</span>{/if}
<button class="btn btn-primary btn-wide float-right" type="submit" form="event_data">Next</button>
