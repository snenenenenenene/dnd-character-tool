import { Class } from "@/data/classes/types";
import { Race } from "@/data/races/types";
import Link from "next/link";
import React from "react";

interface Sheet {
  name: string;
  race?: Race;
  class?: Class[];
}
interface ListArgs {
  sheets: Sheet[];
}

export const List = ({ sheets }: ListArgs) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      {sheets ? (
        sheets.map((sheet, i) => (
          <Link
            className="w-full flex justify-center items-center h-10 border-b-2 border-light-primary hover:bg-light-primary px-8 py-3 hover:text-light-text"
            tabIndex={0}
            typeof="button"
            key={i}
            href={`/sheets/${sheet.name}`}
          >
            {sheet.name}
          </Link>
        ))
      ) : (
        <p>No sheets! Create a sheet and start your adventure!</p>
      )}
    </div>
  );
};
