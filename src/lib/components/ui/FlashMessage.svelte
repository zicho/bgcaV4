<script lang="ts">
	export let message: string;
	export let type: 'success' | 'error';
</script>


<div class="rounded-none flex items-center justify-center shadow-lg alert {type == 'success' ? 'alert-success' : 'alert-error'}">
	<i class="fa fa-xl {type == 'success' ? 'fa-check' : 'fa-triangle-exclamation'}" /><span>{message}</span>
</div>
