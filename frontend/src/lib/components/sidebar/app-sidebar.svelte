<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import SidebarFooter from './sidebar-footer.svelte';
	import SidebarHeader from './sidebar-header.svelte';
	import SidebarMenu from './sidebar-menu.svelte';
	import SidebarSubfooter from './sidebar-subfooter.svelte';
	import { gameState } from '@/lib/state/gameState.svelte';
	import { getItems } from './util';
	import { House } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let items = $derived(getItems(gameState.currentGame?.name));
</script>

<Sidebar.Root>
	<SidebarHeader />
	<Sidebar.Content class="gap-0">
		<Sidebar.Menu class="mt-4 mr-2 mb-2 ml-2 w-auto">
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					onclick={async () => await goto(resolve(`/${gameState.currentGame?.name || '/'}`))}
				>
					<House />
					<span>Home</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
		{#if gameState.currentGame}
			<SidebarMenu label="Player Stats" items={items.statsItems} />
			<SidebarMenu label="Resources" items={items.toolsItems} />
		{/if}
		<SidebarSubfooter />
	</Sidebar.Content>
	<SidebarFooter />
</Sidebar.Root>
