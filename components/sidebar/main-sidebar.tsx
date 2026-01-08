"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import MainFooter from "./main-footer";
import MainSubFooter from "./main-subfooter";
import MainMenu from "./main-menu";
import { MainHeader } from "./main-header";
import { Home } from "lucide-react";
import { games } from "@/lib/gamedata";
import { Game } from "@/types/games";
import { getItems } from "./util";

export default function MainSidebar() {
  const defaultGame = useMemo(() => {
    return games.find((g: Game) => g?.default) as Game;
  }, [games]);

  const [game, setGame] = useState<Game | undefined>(defaultGame);

  const handleGameChange = (game: Game) => {
    if (!game) setGame(undefined);
    setGame(game);
  };

  const items = getItems(game?.name);

  return (
    <Sidebar variant="inset">
      <MainHeader game={game} />
      <SidebarContent className="gap-0">
        <SidebarMenu key="Home" className="ml-2 mr-2 mt-4 mb-2 w-auto">
          <SidebarMenuItem key="Home">
            <SidebarMenuButton asChild>
              <Link href="/">
                <Home />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {game ? (
          <>
            <MainMenu label="Player Stats" items={items.statsItems} />
            <MainMenu label="Resources" items={items.toolsItems} />
          </>
        ) : null}
        <MainSubFooter />
      </SidebarContent>
      <MainFooter
        currentGame={game}
        games={games}
        onGameChange={handleGameChange}
      />
    </Sidebar>
  );
}

// clean up and test, break out dropdown from footer
// start building pages
