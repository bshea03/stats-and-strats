<script lang="ts">
	import { Info, Settings } from '@lucide/svelte';
	import * as Sidebar from '../ui/sidebar';

	const footerItems = [
		{
			title: 'Settings',
			url: '#',
			icon: Settings
		},
		{
			title: 'Get Help',
			url: '#',
			icon: Info
		}
	];
</script>

<Sidebar.Group class="mt-auto">
	<Sidebar.GroupContent>
		<Sidebar.Separator class="mx-0 mb-4" />
		<Sidebar.Menu>
			{#each footerItems as item (item.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton>
						<goto class="flex flex-row items-center gap-2" href={item.url}>
							<item.icon />
							<span>{item.title}</span>
						</goto>
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
