/* eslint-disable no-unused-vars */
import { Race } from "@/data/races/types";
import React, { useState } from "react";
import { Input } from "../common/Input";

interface CharacterFormArgs {
  setSelectedRaces: (_?: any) => void;
  currRace: Race;
  charIndex: number;
}

export const CharacterForm = ({
  setSelectedRaces,
  currRace,
  charIndex,
}: CharacterFormArgs) => {
  const [level, setLevel] = useState<number>(0);

  return (
    <div className="flex flex-col w-1/2 relative gap-4" key={currRace?.name}>
      <button
        className="w-4 h-4 bg-red-600 absolute top-2 right-2 rounded-full"
        onClick={() =>
          setSelectedRaces((selectedRaces: Race[]) => {
            const arrWithRemovedRace = selectedRaces.filter(
              (_currRace, index) => index !== charIndex
            );
            return arrWithRemovedRace;
          })
        }
      ></button>
      <h4>{currRace?.name}</h4>
      <Input
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        placeholder="lol"
      />
    </div>
  );
};
