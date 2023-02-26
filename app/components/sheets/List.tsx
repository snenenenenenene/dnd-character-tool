import { Sheet, useSheetStore } from "@/app/utils/store";
import { Class } from "@/data/classes/types";
import { Race } from "@/data/races/types";
import { useRouter } from "next/navigation";
import React from "react";

interface ListArgs {
  sheets: Sheet[];
}

export const List = ({ sheets }: ListArgs) => {
  const router = useRouter();
  const selectSheet = useSheetStore((state: any) => state.selectSheet);
  const selectedSheet = useSheetStore((state: any) => state.selectedSheet);

  const setCharacter = async (characterName: string) => {
    selectSheet(characterName);
    router.push(`/sheets/${selectedSheet?.name}`);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {sheets ? (
        sheets.map((sheet, i) => (
          <button
            className="w-full flex justify-center items-center h-10 border-b-2 border-light-primary hover:bg-light-primary px-8 py-3 hover:text-light-text"
            key={i}
            onClick={() => setCharacter(sheet.name)}
          >
            <section className="flex gap-10">
              <p>{sheet.name}</p>
              <p>{sheet.race.name}</p>
              <p>Level: {sheet.level}</p>
            </section>
          </button>
        ))
      ) : (
        <p>No sheets! Create a sheet and start your adventure!</p>
      )}
    </div>
  );
};
