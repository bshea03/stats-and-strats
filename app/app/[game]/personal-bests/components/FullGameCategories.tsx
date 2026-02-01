import { Spinner } from "@/components/ui/spinner";
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
import { useCategories } from "@/hooks/react-query/categories";
import { Game } from "@/types/games";
import Image from "next/image";

export default function FullGameCategories({ game }: { game: Game | null }) {
  const {
    data: categories,
    isLoading,
    error,
  } = useCategories(game?.srcId ?? "");

  const perGameCategories =
    categories?.filter((cat) => cat.type === "per-game") ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Spinner className="size-8" />
        <p className="text-sm text-muted-foreground">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-4">
        Error loading categories
      </div>
    );
  }

  if (perGameCategories.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-8">
        No full game categories found
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
              <TableHead className="w-32 font-semibold">Category</TableHead>
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
            {perGameCategories.map((cat) => (
              <TableAccordionItem value={cat.id} key={cat.id}>
                <TableAccordionTriggerRow>
                  <TableCell>
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
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="font-mono text-sm">1:34.63</div>
                    <div className="text-xs text-green-600 font-mono">
                      -0.40s
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-muted-foreground">
                    1:35.03
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-blue-600">
                    1:32.50
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-orange-600">
                    2.13s
                  </TableCell>
                </TableAccordionTriggerRow>
                <TableRow className="hover:bg-inherit">
                  <TableCell colSpan={7} className="p-0">
                    <TableAccordionContent>
                      Segment breakdown and detailed stats will go here
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
