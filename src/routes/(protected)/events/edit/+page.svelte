<script lang="ts">
	import Checkbox from "$lib/components/form/Checkbox.svelte";
	import PageHeaderToolbar from "$lib/components/ui/PageHeaderToolbar.svelte";
	import { getDate } from "$lib/functions/util/getDate";
	import { getHourTimeStamps } from "$lib/functions/util/getHourTimestamps";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";

	export let data: PageData;

	const { form, errors, constraints, enhance, message } = superForm(data.form);

	const { game } = data;
</script>

<PageHeaderToolbar title="Creating new event" />

<article class="prose">
	<h2>Step 1</h2>
	<p>Choose time and place for the event. Add games and invite guests in the next step.</p>
</article>

<div class="divider" />

<article class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
	<section class="space-y-4">
		<Checkbox
			id="virtual_event"
			title="Virtual event"
			tooltip="If an event is marked virtual, that means it's organized online on something like Tabletop Simulator or Board Game Arena"
		/>

		<Checkbox
			id="allow_time_suggestions"
			title="Allow attendants to suggest other times"
			tooltip="If this is checked, it is possible for other attendants (and yourself) to suggest alternative dates for the event"
		/>

		<Checkbox
			id="allow_game_suggestions"
			title="Allow attendants to suggest other games"
			tooltip="If this is checked, it is possible for other attendants to suggest games for the event"
		/>
	</section>

	<section class="mt-8">
		<div class="flex flex-row justify-between items-center mb-4">
			<h2 class="text-2xl font-semibold">Details</h2>

			<!-- <div
				class="tooltip tooltip-left"
				data-tip="You may add several dates for attendants to vote on based on availability. Event creator has final say in event date. "
			>
				<i class="ml-4 fa fa-question-circle cursor-pointer opacity-50" />
			</div> -->
		</div>

		<form use:enhance method="post" action="?/add_date" class="flex flex-col space-y-4">
			<div class="flex flex-col md:flex-row md:space-x-4">
				<!-- First Form Control -->
				<div class="form-control flex-grow">
					<label class="label" for="date">
						<span class="label-text">Pick date:</span>
					</label>
					<input
						type="date"
						id="date"
						name="date"
						min={getDate()}
						max={getDate({ addMonths: 12 })}
						class="input input-bordered"
						class:input-error={$errors.date ? "true" : undefined}
						class:text-error={$errors.date ? "true" : undefined}
						aria-invalid={$errors.date ? "true" : undefined}
					/>
					{#if $errors.date}<span class="label-text text-error">{$errors.date}</span>{/if}
				</div>

				<!-- Second Form Control -->
				<div class="form-control flex-grow">
					<label class="label" for="startTime">
						<span class="label-text">Pick start time:</span>
					</label>
					<input
						type="time"
						id="startTime"
						name="startTime"
						min="00:00"
						max="23:00"
						class="input input-bordered"
						class:text-error={$errors.startTime ? "true" : undefined}
						class:input-error={$errors.startTime ? "true" : undefined}
						aria-invalid={$errors.startTime ? "true" : undefined}
					/>
					{#if $errors.startTime}<span class="label-text text-error">{$errors.startTime}</span>{/if}
				</div>
			</div>
		</form>

		<!-- <h2 class="mt-8 mb-4 text-2xl font-semibold">Suggested dates</h2> -->
	</section>
</article>
<div class="divider" />

<button class="btn btn-primary btn-wide float-right" type="submit">Next</button>
