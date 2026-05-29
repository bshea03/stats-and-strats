<script lang="ts">
	import { Avatar, AvatarFallback } from '../ui/avatar';
	import { SidebarHeader } from '../ui/sidebar';
	import { gameState } from '@/lib/state/gameState.svelte';
	import type { Game } from '@/types/games';

	let game = $derived<Game | undefined>(gameState.currentGame);
</script>

<SidebarHeader class="flex flex-row items-center gap-4 pt-4 pb-0 pl-4">
	<Avatar class="h-8 w-8 rounded-lg">
		{#if game?.icon}
			<img
				src={game?.icon}
				alt={game?.title}
				width={32}
				height={32}
				class="aspect-square size-full rounded-lg"
			/>
		{:else}
			<AvatarFallback></AvatarFallback>
		{/if}
	</Avatar>
	<div>
		{#if game?.title}
			{game.title}
		{:else}
			Stats & Strats
		{/if}
	</div>
</SidebarHeader>
