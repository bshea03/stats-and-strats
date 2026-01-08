import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

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
  return (
    <DropdownMenuRadioGroup
      className="flex flex-col gap-1 py-1"
      value={currentGame?.name}
      onValueChange={handleGameChange}
    >
      {games.map((g) => (
        <Link href={`/${g.name}`} key={g.id}>
          <DropdownMenuRadioItem
            className="flex flex-row items-center h-12 pl-2 mx-1 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
            value={g.name}
            hideIndicator
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
        </Link>
      ))}
    </DropdownMenuRadioGroup>
  );
}
