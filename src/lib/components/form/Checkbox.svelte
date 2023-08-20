<script lang="ts">
	export let title: string;
	export let id: string;
	export let name: string;
	export let value: any;
	export let tooltip: string | undefined = "";
	export let checked: boolean = false;
</script>

<div class="form-control">
	<div class="flex justify-between items-center">
		<label for={id} class="label cursor-pointer p-0">
			<span class="label p-0">{title}</span>
		</label>

		<div class="flex items-center">
			<input {id} {name} {value} type="checkbox" class="checkbox checkbox-primary" {checked} />
			{#if tooltip}
				<div class="tooltip tooltip-left" data-tip={tooltip}>
					<i class="ml-4 fa fa-question-circle cursor-pointer opacity-50" />
				</div>
			{/if}
		</div>
	</div>
</div>
