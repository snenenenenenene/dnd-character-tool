/* eslint-disable no-unused-vars */
import { useSheetStore } from "@/app/utils/store";
import { Race } from "@/data/races/types";
import React, { useState } from "react";
import { Input } from "../common/Input";

interface CharacterFormArgs {
  currClass: any;
  classIndex: number;
}

export const CharacterForm = ({ currClass, classIndex }: CharacterFormArgs) => {
  const [level, setLevel] = useState<number>(0);
  const setClass = useSheetStore((state) => state.setClass);
  return (
    <div className="flex flex-col w-1/2 relative gap-4" key={currClass?.name}>
      <button
        className="w-4 h-4 bg-red-600 absolute top-2 right-2 rounded-full"
        onClick={() =>
          setClass((selectedClasses: any[]) => {
            const arrWithRemovedClass = selectedClasses.filter(
              (_currClass, index) => index !== classIndex
            );
            return arrWithRemovedClass;
          })
        }
      ></button>
      <h4>{currClass?.name}</h4>
      <Input
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        placeholder="lol"
      />
    </div>
  );
};
