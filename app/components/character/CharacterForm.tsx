/* eslint-disable no-unused-vars */
import { useSheetStore } from "@/app/utils/store";
import { Class } from "@/data/classes/types";
import { Race } from "@/data/races/types";
import React, { useState } from "react";
import { GiFlamer } from "react-icons/gi";
import { Input } from "../common/Input";

interface CharacterFormArgs {
  currClass: any;
  classIndex: number;
}

export const CharacterForm = ({ currClass, classIndex }: CharacterFormArgs) => {
  const [level, setLevel] = useState<number>(0);

  const selectedSheet = useSheetStore((state) => state.selectedSheet);
  const updateSelectedSheet = useSheetStore(
    (state) => state.updateSelectedSheet
  );
  return (
    <div className="flex flex-col w-1/2 relative gap-4" key={currClass?.name}>
      <button
        className="w-8 h-8 flex justify-center items-center text-2xl bg-gradient-to-r from-yellow-500 to-red-500 shadow-2xl absolute top-0 right-0 rounded-full"
        onClick={() =>
          updateSelectedSheet({
            class: selectedSheet?.class.filter(
              (c: Class) => c.name !== currClass.name
            ),
          })
        }
      >
        <GiFlamer />
      </button>
      <section className="flex justify-between">
        <h4 className="text-8xl font-bold">{currClass?.name}</h4>
        <img src={currClass?.image} className="w-40 h-40 object-contain" />
      </section>
      <Input
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        placeholder="lol"
      />
    </div>
  );
};
