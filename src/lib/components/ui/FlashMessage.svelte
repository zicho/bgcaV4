<style>
	#dismiss-checkbox {
		display: none;
	}

	#dismiss-checkbox:checked + label {
		display: none;
	}

	#dismiss-icon {
		opacity: 0;
		transition: opacity 0.2s ease-in-out; /* Add a transition effect */
	}

	/* Fade in the dismiss icon when hovering the outermost div */
	.alert:hover #dismiss-icon {
		opacity: 1;
	}
</style>

<script lang="ts">
	export let message: string;
	export let type: "success" | "error" | "info" | "warning";

	const getAlertStyle = () => {
		let style = "";
		let icon = "";

		switch (type) {
			case "success":
				style = "alert-success";
				icon = "fa-circle-check";
				break;
			case "info":
				style = "alert-info";
				icon = "fa-circle-info";
				break;
			case "warning":
				style = "alert-warning";
				icon = "fa-triangle-exclamation";
				break;
			case "error":
				style = "alert-error";
				icon = "fa-circle-xmark";
				break;
			default:
				throw new Error("Invalid status.");
		}

		return { style, icon };
	};
</script>

<input type="checkbox" id="dismiss-checkbox" />
<label for="dismiss-checkbox">
	<div
		class="rounded-none flex items-center justify-center shadow-lg alert {getAlertStyle().style}"
	>
		<i class="fa fa-xl {getAlertStyle().icon}" aria-hidden="true" />
		<label for="dismiss-checkbox">
			<span>{message}</span>
		</label>
		<i id="dismiss-icon" class="fa fa-xl fa-close" aria-hidden="true" />
	</div>
</label>
