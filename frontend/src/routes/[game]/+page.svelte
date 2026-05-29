<script lang="ts">
	// import { useParams } from 'next/navigation';
	// import { Category } from 'srcjs';
	import PageLayout from '$lib/components/page-layout.svelte';
	import { Separator } from '@/lib/components/ui/separator';
	// import {
	// 	Card,
	// 	CardAction,
	// 	CardContent,
	// 	CardDescription,
	// 	CardFooter,
	// 	CardHeader,
	// 	CardTitle
	// } from '@/components/ui/card';
	// import Spinner from '@/components/ui/spinner';
	// import { useCategories } from '@/hooks/react-query/categories';
	// import { useGame } from '@/hooks/react-query/games';
	import { Games, Categories } from '$lib/wailsjs/go/main/App';
	import { gameState } from '@/lib/state/gameState.svelte';

	// const params = useParams();
	// const gameName = params.game as string;

	let data = $state(null);
	let loading = $state(false);

	// Use $effect to trigger fetch when needed
	$effect(() => {
		// Example: fetch when a dependency changes
		loadData();
	});

	async function loadData() {
		loading = true;
		try {
			// Call Go backend method
			const result = await Categories(gameState?.currentGame?.srcId || '');
			console.log(result.data);
		} catch (error) {
			console.error('Failed to fetch data:', error);
		} finally {
			loading = false;
		}
	}

	// First, fetch the game data from your backend (includes SRC ID)
	// const {
	//   data: game,
	//   isLoading: gameLoading,
	//   error: gameError,
	// } = useGame(gameName);

	// Then, use the SRC ID to fetch categories from SRC API
	// const {
	//   data: categories,
	//   isLoading: categoriesLoading,
	//   error: categoriesError,
	// } = useCategories(game?.srcId ?? "");

	// const isLoading = gameLoading || categoriesLoading;
	// const error = gameError || categoriesError;
</script>

<!-- <PageLayout title="Home">
	<div class="px-4">
		{#if isLoading}
			<Spinner class="size-8" />
		{/if}
		{#if error}
			<div>Error loading categories</div>
		{/if}
		<h2 class="my-6 ml-4 w-full text-3xl font-bold">Categories</h2>
		<Separator class="w-full" />
		<div class="mt-4 grid grid-cols-2">
      {categories
        ?.filter((cat: Category) => cat.type === "per-game")
        .map((cat: Category) => (
          <Card class="m-2 h-100" key={cat.id}>
            <CardHeader>
              <CardTitle class="text-2xl font-semibold @[250px]/card:text-3xl">
                {cat.name}
              </CardTitle>
              <CardDescription>{cat.rules}</CardDescription>
              <CardAction class="text-sm">View</CardAction>
            </CardHeader>
            <CardContent>
              <p>card content</p>
            </CardContent>
            <CardFooter>
              <p>card footer</p>
            </CardFooter>
          </Card>
        ))}
    </div>
	</div>
</PageLayout> -->
