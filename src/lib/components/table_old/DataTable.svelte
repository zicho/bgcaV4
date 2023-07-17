<div class="grid grid-cols-8 border border-base-200">
	<div
		class="col-span-8 grid grid-cols-8 font-semibold border-b border-base-200 bg-primary-content"
	>
		<slot name="headers" />
	</div>
	<div class="col-span-8 grid grid-cols-8 font-semibold">
		<slot name="data" />
	</div>
</div>
