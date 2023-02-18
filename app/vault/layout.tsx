import React from "react";
import InitiativeTracker from "./initiativeTracker";

interface LayoutArgs {
  children: React.ReactNode;
}
export default function Page({ children }: LayoutArgs) {
  return (
    <div className="w-full h-full flex  flex-col">
      <section className="flex w-full"></section>
      <section className="flex w-full h-full overflow-scroll">
        {children}
        <InitiativeTracker/>
      </section>
    </div>
  );
}
