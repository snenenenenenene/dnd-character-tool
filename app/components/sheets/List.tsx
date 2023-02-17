import { useSheetStore } from "@/app/utils/store";
import { Class } from "@/data/classes/types";
import { Race } from "@/data/races/types";
import { useRouter } from "next/navigation";
import React from "react";

export interface Sheet {
  name: string;
  race: Race | {};
  class: Class[] | [];
}
interface ListArgs {
  sheets: Sheet[];
}

export const List = ({ sheets }: ListArgs) => {
  const router = useRouter();
  const setCurrentSheet = useSheetStore((state) => state.setCurrentSheet);
  function setCharacter(characterName: string) {
    setCurrentSheet(characterName);
    router.push(`/sheets/${characterName}`);
  }
  return (
    <div className="flex flex-col gap-8 w-full">
      {sheets ? (
        sheets.map((sheet, i) => (
          <button
            className="w-full flex justify-center items-center h-10 border-b-2 border-light-primary hover:bg-light-primary px-8 py-3 hover:text-light-text"
            key={i}
            onClick={() => setCharacter(sheet.name)}
          >
            {sheet.name}
          </button>
        ))
      ) : (
        <p>No sheets! Create a sheet and start your adventure!</p>
      )}
    </div>
  );
};
