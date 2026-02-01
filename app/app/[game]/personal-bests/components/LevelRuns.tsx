import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TableAccordion,
  TableAccordionContent,
  TableAccordionItem,
  TableAccordionTriggerRow,
} from "@/components/ui/table-accordion";
import { Level, useLevels } from "@/hooks/react-query/levels";
import { Spinner } from "@/components/ui/spinner";
import { Game } from "@/types/games";

export default function LevelRuns({ game }: { game: Game | null }) {
  const { data: levels, isLoading, error } = useLevels(game?.srcId ?? "");

  const levelsList = levels ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Spinner className="size-8" />
        <p className="text-sm text-muted-foreground">Loading levels...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-4">
        Error loading levels
      </div>
    );
  }

  if (levelsList.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-8">
        No levels found
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <TableAccordion type="single" collapsible>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-10"></TableHead>
              <TableHead className="w-32 font-semibold">Level</TableHead>
              <TableHead className="text-right w-32 font-semibold">
                Most Recent PB
              </TableHead>
              <TableHead className="text-right w-32 font-semibold">
                Previous PB
              </TableHead>
              <TableHead className="text-right w-32 font-semibold">
                Sum of Best
              </TableHead>
              <TableHead className="text-right w-32 font-semibold">
                Potential Time Save
              </TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {levelsList.map((level: Level) => (
              <TableAccordionItem value={level.id} key={level.id}>
                <TableAccordionTriggerRow>
                  <TableCell className="text-center">
                    {game && (
                      <Image
                        src={game.icon}
                        alt={game.title}
                        width={40}
                        height={40}
                        className="aspect-square rounded-lg ml-1"
                        unoptimized
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{level.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="font-mono text-sm">0:34.63</div>
                    <div className="text-xs text-green-600 font-mono">
                      -0.40s
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-muted-foreground">
                    0:35.03
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-blue-600">
                    0:33.10
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-orange-600">
                    1.53s
                  </TableCell>
                </TableAccordionTriggerRow>
                <TableRow className="hover:bg-inherit">
                  <TableCell colSpan={7} className="p-0">
                    <TableAccordionContent>
                      Level-specific stats and details will go here
                    </TableAccordionContent>
                  </TableCell>
                </TableRow>
              </TableAccordionItem>
            ))}
          </TableBody>
        </Table>
      </TableAccordion>
    </div>
  );
}
