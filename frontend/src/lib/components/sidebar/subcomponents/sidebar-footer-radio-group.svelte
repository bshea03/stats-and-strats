<script lang="ts">
	import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '$lib/components/ui/dropdown-menu';
	import type { Game } from '@/types/games';
	import { gameState, updateGame } from '@/lib/state/gameState.svelte';

	interface SidebarFooterRGProps {
		games: Game[];
	}

	let { games }: SidebarFooterRGProps = $props();
</script>

<DropdownMenuRadioGroup
	class="flex flex-col gap-1 py-1"
	value={gameState.currentGame?.name}
	onValueChange={updateGame}
>
	{#each games as g (g.srcId)}
		<goto href={`/${g.name}`}>
			<DropdownMenuRadioItem
				class="mx-1 flex h-12 flex-row items-center pl-2 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
				value={g.name}
			>
				<img src={g.icon} alt={g.title} width={32} height={32} class="h-8 w-8 rounded-lg" />
				<div class="flex flex-1 flex-col text-left text-sm">
					<span class="truncate font-medium">{g.title}</span>
					{#if g.default}
						<span class="truncate text-xs text-muted-foreground"> Default Game </span>
					{/if}
				</div>
			</DropdownMenuRadioItem>
		</goto>
	{/each}
</DropdownMenuRadioGroup>
