import { LogOut, Plus } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import MainFooterRadioGroup from "./footer-radio-group";

interface MainFooterDropdownProps {
  games: any[];
  currentGame: any;
  handleGameChange: (game: string) => void;
  handleAddGame: () => void;
}

export default function MainFooterDropdown({
  games,
  currentGame,
  handleGameChange,
  handleAddGame,
}: MainFooterDropdownProps) {
  return (
    <DropdownMenuContent
      className="rounded-lg w-60 max-height-96 overflow-y-auto"
      align="start"
      sideOffset={4}
    >
      <DropdownMenuGroup>
        {games.length ? (
          <MainFooterRadioGroup
            games={games}
            currentGame={currentGame}
            handleGameChange={handleGameChange}
          />
        ) : (
          <DropdownMenuItem className="flex flex-row items-center justify-start gap-3 mx-1 mt-1 mb-2">
            <span className="text-muted-foreground italic truncate text-sm">
              No games found
            </span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="group flex flex-row items-center data-[state=checked]:bg-accent mx-1 pl-1.5 mt-2 mb-2"
          onSelect={handleAddGame}
        >
          <div className="flex flex-row gap-3 items-center rounded-md h-full w-full ">
            <Plus /> <span>Add Game</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-row items-center gap-3 mx-1 mt-2 mb-1">
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
