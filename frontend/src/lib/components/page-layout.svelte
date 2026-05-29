<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { Separator } from './ui/separator';
	import { SidebarTrigger } from './ui/sidebar';

	interface PageLayoutProps {
		title: string;
		children: SvelteComponent;
	}

	const { title, children }: PageLayoutProps = $props();
</script>

<div>
	<div class="flex flex-row items-center border-b">
		<SidebarTrigger class="mx-4 my-3" />
		<Separator orientation="vertical" class="mr-6 data-[orientation=vertical]:h-4" />
		<h2 class="text-lg font-bold">{title}</h2>
	</div>
	{children}
</div>
