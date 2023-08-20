<script lang="ts">
	import type { IRadioButtonOpts } from "$lib/interfaces/components/IRadioButtonOpts";

	export let opts: IRadioButtonOpts[];
	export let id: string;
</script>

{#each opts as btn}
	<div class="form-control flex flex-row justify-between">
		<label for={btn.id} class="label cursor-pointer p-0">
			<span class="label p-0">{btn.title}</span>
		</label>

		<div class="flex items-center">
			<input
				type="radio"
				value={btn.id}
				name={id}
				class="radio radio-primary"
				checked={btn.checked}
			/>
			{#if btn.tooltip}
				<div class="tooltip tooltip-left" data-tip={btn.tooltip}>
					<i class="ml-4 fa fa-question-circle cursor-pointer opacity-50" />
				</div>
			{/if}
		</div>
	</div>
{/each}
