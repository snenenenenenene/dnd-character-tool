"use client";
import { useSheetStore } from "@/app/utils/store";
import React from "react";
import { Input } from "../common/Input";

export const StatSidebar = () => {
  // type Stats = Record<AbilityType, number>;
  const updateSelectedSheet = useSheetStore(
    (state) => state.updateSelectedSheet
  );

  const selectedSheet = useSheetStore((state) => state.selectedSheet);

  return (
    <section className="flex w-1/6 border-l gap-2 border-light-tertiary flex-col h-full items-center px-12">
      <h1 className={"uppercase font-medium"}>Level</h1>
      <Input
        className="w-16 h-16 text-center text-3xl px-0 py-0"
        id="strength"
        value={selectedSheet?.level}
        onChange={(e) =>
          updateSelectedSheet({ ...selectedSheet, level: e.target.value })
        }
      />
      <h1 className={"uppercase font-medium"}>STRENGTH</h1>
      <Input
        className="w-16 h-16 text-center text-3xl px-0 py-0"
        id="strength"
        value={
          (selectedSheet.stats?.strength > 0 && "+") +
          selectedSheet?.stats?.strength
        }
      />
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="strength"
        type={"number"}
        min={3}
        max={18}
        value={selectedSheet?.thrownStats?.strength}
        onChange={(e) =>
          updateSelectedSheet({
            ...selectedSheet,
            stats: {
              ...selectedSheet.stats,
              strength: Math.floor(Number(e.target.value) - 10 / 2),
            },
            thrownStats: {
              ...selectedSheet.thrownStats,
              strength: e.target.value,
            },
          })
        }
      />
      <h1 className={"uppercase font-medium"}>DEXTERITY</h1>
      <Input
        className="w-16 h-16 text-center text-3xl px-0 py-0"
        value={
          (selectedSheet.stats?.dexterity > 0 && "+") +
          selectedSheet?.stats?.dexterity
        }
        id="dexterity"
      />
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="dexterity"
        type={"number"}
        min={3}
        max={18}
        value={selectedSheet?.thrownStats?.dexterity}
        onChange={(e) =>
          updateSelectedSheet({
            ...selectedSheet,
            stats: {
              ...selectedSheet.stats,
              dexterity: Math.floor(Number(e.target.value) - 10 / 2),
            },
            thrownStats: {
              ...selectedSheet.thrownStats,
              dexterity: e.target.value,
            },
          })
        }
      />
      <h1 className={"uppercase font-medium"}>CONSTITUTION</h1>
      <Input
        value={
          (selectedSheet.stats?.constitution > 0 && "+") +
          selectedSheet?.stats?.constitution
        }
        className="w-16 h-16 text-center text-3xl px-0 py-0 px-0 py-0"
        id="constitution"
      />
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="constitution"
        type={"number"}
        min={3}
        max={18}
        value={selectedSheet?.thrownStats?.constitution}
        onChange={(e) =>
          updateSelectedSheet({
            ...selectedSheet,
            stats: {
              ...selectedSheet.stats,
              constitution: Math.floor(Number(e.target.value) - 10 / 2),
            },
            thrownStats: {
              ...selectedSheet.thrownStats,
              constitution: e.target.value,
            },
          })
        }
      />
      <h1 className={"uppercase font-medium"}>INTELLIGENCE</h1>
      <Input
        value={
          (selectedSheet.stats?.intelligence > 0 && "+") +
          selectedSheet?.stats?.intelligence
        }
        className="w-16 h-16 text-center text-3xl px-0 py-0"
        id="strength"
      />
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="constitution"
        type={"number"}
        min={3}
        max={18}
        value={selectedSheet?.thrownStats?.intelligence}
        onChange={(e) =>
          updateSelectedSheet({
            ...selectedSheet,
            stats: {
              ...selectedSheet.stats,
              intelligence: Math.floor(Number(e.target.value) - 10 / 2),
            },
            thrownStats: {
              ...selectedSheet.thrownStats,
              intelligence: e.target.value,
            },
          })
        }
      />
      <h1 className={"uppercase font-medium"}>WISDOM</h1>
      <Input
        value={
          (selectedSheet.stats?.wisdom > 0 && "+") +
          selectedSheet?.stats?.wisdom
        }
        className="w-16 h-16 text-center text-3xl px-0 py-0"
        id="strength"
      />
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="constitution"
        type={"number"}
        min={3}
        max={18}
        value={selectedSheet?.thrownStats?.wisdom}
        onChange={(e) =>
          updateSelectedSheet({
            ...selectedSheet,
            stats: {
              ...selectedSheet.stats,
              wisdom: Math.floor(Number(e.target.value) - 10 / 2),
            },
            thrownStats: {
              ...selectedSheet.thrownStats,
              wisdom: e.target.value,
            },
          })
        }
      />
      <h1 className={"uppercase font-medium"}>CHARISMA</h1>
      <Input
        value={
          (selectedSheet.stats?.charisma > 0 && "+") +
          selectedSheet?.stats?.charisma
        }
        className="w-16 h-16 text-center text-3xl px-0 py-0"
        id="strength"
      />
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="constitution"
        type={"number"}
        min={3}
        max={18}
        type={"number"}
        min={3}
        max={18}
        value={selectedSheet?.thrownStats?.charisma}
        onChange={(e) =>
          updateSelectedSheet({
            ...selectedSheet,
            stats: {
              ...selectedSheet.stats,
              charisma: Math.floor(Number(e.target.value) - 10 / 2),
            },
            thrownStats: {
              ...selectedSheet.thrownStats,
              charisma: e.target.value,
            },
          })
        }
      />
    </section>
  );
};
