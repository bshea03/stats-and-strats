<script lang="ts">
	import * as Sidebar from '../ui/sidebar/index';
	import { resolve } from '$app/paths';

	type NavItem = { title: string; url: string; icon: any };

	interface MainMenuPropsType {
		label: string;
		items: NavItem[];
	}

	const { label, items }: MainMenuPropsType = $props();
</script>

<Sidebar.Group class="mb-2 pt-0 pl-2">
	<Sidebar.GroupLabel>{label}</Sidebar.GroupLabel>
	<Sidebar.GroupContent>
		<Sidebar.Menu>
			{#each items as item (item.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton>
						{#snippet child({ props })}
							<a href={resolve(item.url)} {...props}>
								<item.icon />
								<span>{item.title}</span></a
							>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
