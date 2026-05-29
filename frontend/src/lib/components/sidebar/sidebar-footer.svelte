<script lang="ts">
	import { Avatar } from '../ui/avatar';
	import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';
	import * as Sidebar from '../ui/sidebar';
	import { EllipsisVertical } from '@lucide/svelte';
	import SidebarFooterDropdown from './subcomponents/sidebar-footer-dropdown.svelte';
	import { gameState } from '@/lib/state/gameState.svelte';

	// TODO: Implement
	const handleAddGame = (event: Event) => {
		console.log('Add game', event);
	};
</script>

<Sidebar.Footer>
	<Sidebar.Menu>
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Sidebar.MenuButton
					size="lg"
					class="mb-2 flex flex-row items-center gap-4 rounded-lg focus-visible:ring-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Avatar class="h-8 w-8 rounded-lg">
						<img
							src="https://github.com/evilrabbit.png"
							alt="avatar"
							width={32}
							height={32}
							class="aspect-square size-full rounded-lg"
						/>
					</Avatar>
					<div class="flex flex-1 flex-col text-left text-sm">
						<span class="truncate font-medium">siggyscorp</span>
						<span class="truncate text-xs text-muted-foreground">
							{gameState.currentGame?.title ? gameState.currentGame.title : 'Select a game'}
						</span>
					</div>
					<EllipsisVertical className="ml-auto size-4 items-center" />
					<SidebarFooterDropdown {handleAddGame} />
				</Sidebar.MenuButton>
			</DropdownMenuTrigger>
		</DropdownMenu>
	</Sidebar.Menu>
</Sidebar.Footer>
