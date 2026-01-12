"use client";

import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { Avatar } from "../ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SidebarFooter, SidebarMenu, SidebarMenuButton } from "../ui/sidebar";
import { Game } from "@/types/games";
import MainFooterDropdown from "./subcomponents/footer-dropdown";

interface MainFooterProps {
  currentGame?: Game;
  games: Game[];
  onGameChange: (game: Game) => void;
}

export default function MainFooter({
  currentGame,
  games,
  onGameChange,
}: MainFooterProps) {
  const handleGameChange = (game: string) => {
    const foundGame = games.find((g) => g.name === game) as Game;
    onGameChange(foundGame);
  };

  // TODO: Implement
  const handleAddGame = () => {
    console.log("Add game");
  };

  return (
    <SidebarFooter>
      <SidebarMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="rounded-lg flex flex-row items-center gap-4 mb-2 focus-visible:ring-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="w-8 h-8 rounded-lg">
                <Image
                  src="https://github.com/evilrabbit.png"
                  alt="avatar"
                  width={32}
                  height={32}
                  className="aspect-square size-full rounded-lg"
                  unoptimized
                />
              </Avatar>
              <div className="flex flex-1 flex-col text-left text-sm">
                <span className="truncate font-medium">siggyscorp</span>
                <span className="text-muted-foreground truncate text-xs">
                  {currentGame?.title ? currentGame.title : "Select a game"}
                </span>
              </div>
              <EllipsisVertical className="ml-auto size-4 items-center" />
              <MainFooterDropdown
                games={games}
                currentGame={currentGame}
                handleGameChange={handleGameChange}
                handleAddGame={handleAddGame}
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenu>
    </SidebarFooter>
  );
}

/*
 * Add a game switcher to the footer rarther than a games tab
 * ILs, PBs, and previous runs
 * Resources, Tools, and recent runs
 * Pull category data from SRC API, scrape data from ultimate star sheet
 * Load game data from a local JSON file or database
 *
 */
