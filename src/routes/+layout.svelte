<script lang="ts">
	import '../app.css';
</script>

<div class="navbar bg-neutral text-neutral-content">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">App</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a href="login" class="hover:text-neutral-content">Login</a></li>
			<li><a href="register" class="hover:text-neutral-content">Register</a></li>
		</ul>
	</div>
</div>

<div class="py-6 lg:py-10 px-6 lg:px-16 h-screen bg-neutral-content">
	<slot />
</div>
