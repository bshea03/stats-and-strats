<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import AppSidebar from '$lib/components/sidebar/app-sidebar.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Sidebar.Provider>
	<AppSidebar />
	<main class="rounded-lg">
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
