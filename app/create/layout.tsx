import { Button } from "@/app/components/common/Button";
import React from "react";

interface LayoutArgs {
  children: React.ReactNode;
}
export default function Page({ children }: LayoutArgs) {
  return (
    <div className="w-full h-full flex  flex-col">
      <section className="flex w-full">
        <Button className="mr-8">New</Button>
        {/* <Button>List</Button> */}
      </section>
      <section className="flex w-full h-full">{children}</section>
    </div>
  );
}
