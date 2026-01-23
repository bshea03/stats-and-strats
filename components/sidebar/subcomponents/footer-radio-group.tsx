import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Game } from "@/types/games";

interface MainFooterRadioGroupProps {
  games: any[];
  currentGame: any;
  handleGameChange: (game: string) => void;
}

export default function MainFooterRadioGroup({
  games,
  currentGame,
  handleGameChange,
}: MainFooterRadioGroupProps) {
  const router = useRouter();

  return (
    <DropdownMenuRadioGroup
      className="flex flex-col gap-1 py-1"
      value={currentGame?.name}
      onValueChange={handleGameChange}
    >
      {games.map((g: Game) => (
        <DropdownMenuRadioItem
          key={g.name}
          className="flex flex-row items-center h-12 pl-2 mx-1 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
          value={g.name}
          hideIndicator
          onClick={() => router.push(`/${g.name}`)}
        >
          <Image
            src={g.icon}
            alt={g.title}
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg"
            unoptimized
          />
          <div className="flex flex-1 flex-col text-left text-sm">
            <span className="truncate font-medium">{g.title}</span>
            {g.default ? (
              <span className="text-muted-foreground truncate text-xs">
                Default Game
              </span>
            ) : null}
          </div>
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
}
