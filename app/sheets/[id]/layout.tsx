"use client";
import { StatSidebar } from "@/app/components/character/StatSidebar";
import React, { useEffect } from "react";

interface LayoutArgs {
  children: React.ReactNode;
  params: {
    id: string;
  };
}
export default function Page({ children, params }: LayoutArgs) {
  return (
    <div className="w-full h-full flex  flex-col">
      <section className="flex w-full h-full overflow-y-scroll pr-48">
        {children}
        <StatSidebar sheetId={params?.id} />
      </section>
    </div>
  );
}
