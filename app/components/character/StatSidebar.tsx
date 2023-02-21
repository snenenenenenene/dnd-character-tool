"use client";
import { AbilityType } from "@/data/classes/types";
import React, { useState } from "react";
import { Input } from "../common/Input";

export const StatSidebar = () => {
  type Stats = Record<AbilityType, number>;
  const [_stats, setStats] = useState<Stats>({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  });
  return (
    <section className="flex w-1/6 border-l border-light-tertiary flex-col h-full items-center text-3xl px-12">
      <h1 className={"uppercase font-medium"}>Level</h1>
      <Input
        className="w-24 h-24 text-center text-4xl"
        type="number"
        id="strength"
        onChange={(e) => setStats({ ..._stats, strength: e.target.value })}
      />
      <h1 className={"uppercase font-medium"}>STRENGTH</h1>
      <Input
        className="w-24 h-24 text-center text-4xl"
        type="number"
        id="strength"
        onChange={(e) => setStats({ ..._stats, strength: e.target.value })}
      />
      <h1 className={"uppercase font-medium"}>DEXTERITY</h1>
      <Input
        className="w-24 h-24 text-center text-4xl"
        type="number"
        id="strength"
        onChange={(e) => setStats({ ..._stats, strength: e.target.value })}
      />
      <h1 className={"uppercase font-medium"}>CONSTITUTION</h1>
      <Input
        className="w-24 h-24 text-center text-4xl"
        type="number"
        id="strength"
        onChange={(e) => setStats({ ..._stats, strength: e.target.value })}
      />
      <h1 className={"uppercase font-medium"}>INTELLIGENCE</h1>
      <Input
        className="w-24 h-24 text-center text-4xl"
        type="number"
        id="strength"
        onChange={(e) => setStats({ ..._stats, strength: e.target.value })}
      />
      <h1 className={"uppercase font-medium"}>WISDOM</h1>
      <Input
        className="w-24 h-24 text-center text-4xl"
        type="number"
        id="strength"
        onChange={(e) => setStats({ ..._stats, strength: e.target.value })}
      />
      <h1 className={"uppercase font-medium"}>CHARISMA</h1>
      <Input
        className="w-24 h-24 text-center text-4xl"
        type="number"
        id="strength"
        onChange={(e) => setStats({ ..._stats, strength: e.target.value })}
      />
    </section>
  );
};
