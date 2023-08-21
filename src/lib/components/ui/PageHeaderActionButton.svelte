<script lang="ts">
	export let displayText: string;
	export let icon: string = "fa-check";
	export let disabled: boolean = false;

	export let name: string = "";
	export let value: string = "";

	export let className: "primary" | "secondary" = "primary";
</script>

<button
	{name}
	{value}
	type="submit"
	{disabled}
	class="btn btn-{className} btn-outline w-full md:btn-wide"
	><i class="fa {icon}" />{displayText}</button
>
