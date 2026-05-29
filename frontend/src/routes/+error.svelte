<!-- src/routes/+error.svelte -->
<script>
	import { page } from '$app/stores';
</script>

<div>
	<h1>Error {$page.status}</h1>
	<p>{$page.error?.message}</p>
</div>
