import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { SidebarHeader } from "../ui/sidebar";
import { Game } from "@/types/games";

interface MainHeaderProps {
  game?: Game;
}

export function MainHeader({ game }: MainHeaderProps) {
  return (
    <SidebarHeader className="flex flex-row items-center pl-4 pt-4 pb-0 gap-4">
      <Avatar className="w-8 h-8 rounded-lg">
        {game?.icon ? (
          <Image
            src={game.icon}
            alt={game.title}
            width={32}
            height={32}
            className="aspect-square size-full rounded-lg"
            unoptimized
          />
        ) : (
          <AvatarFallback></AvatarFallback>
        )}
      </Avatar>
      <div>{game?.title ? game.title : "Stats & Strats"}</div>
    </SidebarHeader>
  );
}
