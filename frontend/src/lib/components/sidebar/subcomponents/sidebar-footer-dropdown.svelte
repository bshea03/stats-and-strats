<script lang="ts">
	import SidebarFooterRadioGroup from './sidebar-footer-radio-group.svelte';
	import {
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuSeparator
	} from '$lib/components/ui/dropdown-menu';
	import { LogOut, Plus } from '@lucide/svelte';
	import { games } from '../../../assets/gamedata';

	interface SidebarFooterProps {
		handleAddGame: (event: Event) => void;
	}

	const { handleAddGame }: SidebarFooterProps = $props();
</script>

<DropdownMenuContent
	class="max-height-96 w-56 overflow-y-auto rounded-lg"
	align="start"
	sideOffset={4}
>
	<DropdownMenuGroup>
		{#if games.length}
			<SidebarFooterRadioGroup {games} />
		{:else}
			<DropdownMenuItem class="mx-1 mt-1 mb-2 flex flex-row items-center justify-start gap-3">
				<span class="truncate text-sm text-muted-foreground italic"> No games found </span>
			</DropdownMenuItem>
		{/if}
		<DropdownMenuSeparator />
		<DropdownMenuItem
			class="group mx-1 mt-2 mb-2 flex flex-row items-center pl-1.5 data-[state=checked]:bg-accent"
			onSelect={handleAddGame}
		>
			<div class="flex h-full w-full flex-row items-center gap-3 rounded-md">
				<Plus /> <span>Add Game</span>
			</div>
		</DropdownMenuItem>
		<DropdownMenuSeparator />
		<DropdownMenuItem class="mx-1 mt-2 mb-1 flex flex-row items-center gap-3">
			<LogOut />
			Log out
		</DropdownMenuItem>
	</DropdownMenuGroup>
</DropdownMenuContent>
