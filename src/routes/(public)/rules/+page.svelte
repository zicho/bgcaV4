<script lang="ts">
	import PageHeaderToolbar from "$lib/components/ui/PageHeaderToolbar.svelte";

	export const prerender = true;
</script>

<PageHeaderToolbar title="Rules" />

<div class="prose">
	<div class="card px-4 py-0 bg-base-100 shadow-md h-full">
		<ul class="list-decimal">
			<li>Don't be a douche.</li>
			<li>No racism, sexism, transphobia or any other hateful content.</li>
			<li>
				Do not harass, troll or flame. <strong>If you don't know what it means, see rule 1.</strong>
			</li>
			<li>Do not share any explicit content or links to any such material on this website.</li>
		</ul>
	</div>

	<h2>Furthermore...</h2>
	<p>
		We reserve the right to ban anyone for any reason. But as long as our rules are respected, it
		will not be necessary.<br />
		Use common sense.
	</p>

	<p>Rules can and <i>probably will</i> change over time.</p>

	<p>If you feel the rules need revising or experience harassment, contact our mod team.</p>
</div>
