"use client";

import * as React from "react";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Context for managing accordion state
type AccordionContextValue = {
  openItems: Set<string>;
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
  collapsible: boolean;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null
);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within TableAccordion");
  }
  return context;
}

// Context for individual accordion items
type AccordionItemContextValue = {
  value: string;
  isOpen: boolean;
};

const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionTrigger/Content must be used within TableAccordionItem"
    );
  }
  return context;
}

// Root component
interface TableAccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  children: React.ReactNode;
  defaultValue?: string;
}

function TableAccordion({
  type = "single",
  collapsible = true,
  children,
  defaultValue,
}: TableAccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(
    new Set(defaultValue ? [defaultValue] : [])
  );

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        const newSet = new Set(prev);

        if (newSet.has(value)) {
          // If collapsible is false and this is the only open item, don't close it
          if (!collapsible && type === "single" && newSet.size === 1) {
            return prev;
          }
          newSet.delete(value);
        } else {
          // For single type, clear all other items
          if (type === "single") {
            newSet.clear();
          }
          newSet.add(value);
        }

        return newSet;
      });
    },
    [type, collapsible]
  );

  const contextValue = React.useMemo(
    () => ({ openItems, toggleItem, type, collapsible }),
    [openItems, toggleItem, type, collapsible]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      {children}
    </AccordionContext.Provider>
  );
}

// Item component
interface TableAccordionItemProps {
  value: string;
  children: React.ReactNode;
}

function TableAccordionItem({ value, children }: TableAccordionItemProps) {
  const { openItems } = useAccordionContext();
  const isOpen = openItems.has(value);

  const contextValue = React.useMemo(
    () => ({ value, isOpen }),
    [value, isOpen]
  );

  return (
    <AccordionItemContext.Provider value={contextValue}>
      {children}
    </AccordionItemContext.Provider>
  );
}

// Trigger row component
interface TableAccordionTriggerRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

const TableAccordionTriggerRow = React.forwardRef<
  HTMLTableRowElement,
  TableAccordionTriggerRowProps
>(({ className, children, onClick, ...props }, ref) => {
  const { toggleItem } = useAccordionContext();
  const { value, isOpen } = useAccordionItemContext();

  const handleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    toggleItem(value);
    onClick?.(e);
  };

  return (
    <tr
      ref={ref}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "hover:bg-muted/50",
        "data-[state=open]:border-b-0 data-[state=open]:bg-muted/50",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      <td className="text-right pl-6 py-4">
        <ChevronsUpDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200" />
      </td>
    </tr>
  );
});
TableAccordionTriggerRow.displayName = "TableAccordionTriggerRow";

// Content component
interface TableAccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TableAccordionContent = React.forwardRef<
  HTMLDivElement,
  TableAccordionContentProps
>(({ className, children, ...props }, forwardedRef) => {
  const { isOpen } = useAccordionItemContext();
  const internalRef = React.useRef<HTMLDivElement>(null);

  // Combine refs
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef]
  );

  React.useEffect(() => {
    const element = internalRef.current;
    if (!element) return;

    if (isOpen) {
      // Opening: Start from 0, then animate to scrollHeight
      element.style.maxHeight = "0px";
      // Use requestAnimationFrame to ensure browser processes the initial state
      requestAnimationFrame(() => {
        element.style.maxHeight = element.scrollHeight + "px";
      });
    } else {
      // Closing: first set to current height, then to 0 for animation
      element.style.maxHeight = element.scrollHeight + "px";
      // Force reflow to ensure the browser registers the change
      element.offsetHeight;
      element.style.maxHeight = "0px";
    }
  }, [isOpen]);

  return (
    <div
      ref={setRefs}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        !isOpen && "max-h-0",
        className
      )}
      style={{ maxHeight: isOpen ? "none" : "0px" }}
      {...props}
    >
      <div className="px-4 py-4">{children}</div>
    </div>
  );
});
TableAccordionContent.displayName = "TableAccordionContent";

export {
  TableAccordion,
  TableAccordionItem,
  TableAccordionTriggerRow,
  TableAccordionContent,
};
