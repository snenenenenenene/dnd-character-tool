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
      <section className="flex justify-between h-48">
        <h4 className="text-6xl font-bold">{currClass?.name}</h4>
        <img src={currClass?.image} className="w-40 h-40 object-contain" />
      </section>
      <label htmlFor="level">Level</label>
      <Input
        id="level"
        type="number"
        className="w-16 h-16 flex justify-center items-center text-center"
        value={currClass.level}
        onChange={(e) => {
          const newLevel: number = Number(e.target.value);
          const otherClasses = selectedSheet.class.filter(
            (c: Class, i: number) => i !== classIndex
          );
          const totalOtherLevels = otherClasses.reduce(
            (acc: any, curr: any) => acc + curr.level,
            0
          );

          if (
            newLevel > 0 &&
            newLevel <= selectedSheet.level &&
            Number(e.target.value) > 0 &&
            Number(e.target.value) <= selectedSheet.level - totalOtherLevels
          ) {
            const newClass = selectedSheet.class.map((c: Class, i: number) => {
              if (currClass.name === c.name) {
                return { ...c, level: Number(e.target.value) };
              } else {
                return c;
              }
            });
            updateSelectedSheet({
              ...selectedSheet,
              class: newClass,
            });
          } else {
            console.log("no...");
          }
        }}
        placeholder="0"
      />
    </div>
  );
};
