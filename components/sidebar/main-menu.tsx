import { useRouter } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

interface MainMenuProps {
  label: string;
  items: { title: string; url: string; icon: any }[];
}

type NavItem = { title: string; url: string; icon: any };

export default function MainMenu({ label, items }: MainMenuProps) {
  const router = useRouter();

  const onClickItem = (item: NavItem) => () => {
    router.push(item.url);
  };

  return (
    <SidebarGroup className="pl-2 pt-0 mb-2">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton onClick={onClickItem(item)}>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
