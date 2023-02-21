import { StatSidebar } from "@/app/components/character/StatSidebar";
import React from "react";

interface LayoutArgs {
  children: React.ReactNode;
}
export default function Page({ children }: LayoutArgs) {
  return (
    <div className="w-full h-full flex  flex-col">
      <section className="flex w-full h-full overflow-y-scroll">
        {children}
        <StatSidebar />
      </section>
    </div>
  );
}
