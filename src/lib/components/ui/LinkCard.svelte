<script lang="ts">
	export let title: string;
	export let imgUrl: string;
	export let imgAlt: string;
	export let url: string;
</script>

<div class="card w-full bg-base-100 shadow-xl">
	<figure><img src={imgUrl} alt={imgAlt} class="max-h-48 mt-4" /></figure>
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<!-- Description of the card is passed as a slot -->
		<slot />
		<div class="card-actions justify-end mt-8">
			<a href={url} target="_blank" class="btn btn-primary w-full">
				<i class="fa fa-external-link" aria-hidden="true" />
				Homepage
			</a>
		</div>
	</div>
</div>
