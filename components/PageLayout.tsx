import { ReactNode } from "react";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div>
      <div className="flex flex-row items-center border-b ">
        <SidebarTrigger className="my-3 mx-4" />
        <Separator
          orientation="vertical"
          className="mr-6 data-[orientation=vertical]:h-4"
        />
        <h2 className="font-bold text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
}
