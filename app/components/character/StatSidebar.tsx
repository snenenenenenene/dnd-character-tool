"use client";
import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import React, { useEffect, useState } from "react";
import { Input } from "../common/Input";

export const StatSidebar = ({ sheetId }: { sheetId: string }) => {
  const [sheet, setSheet] = useState<any>({});
  const [updating, setUpdating] = useState<any>({});

  useEffect(() => {
    getSheetWithId(sheetId).then((res) => {
      setSheet(res);
    });
  }, []);

  useEffect(() => {
    if (!updating) {
      setUpdating(true);
      updateSheet();
    }
  }, [sheet?.data]);

  function updateSheet() {
    setUpdating(true);
    updateSheetWithId(sheetId, sheet?.data, sheet?.campaign, sheet?.user)
      .then((res) => {
        setSheet(res);
        console.log(res);
        setUpdating(false);
      })
      .catch((err) => {
        console.log(err);
        setUpdating(false);
      });
  }

  return (
    <section className="flex w-48 fixed right-0 top-0 gap-2 border-light-secondary border-l-2 flex-col h-full items-center px-12">
      <h1 className={"uppercase font-medium"}>Level</h1>
      <Input
        className="w-16 h-16 text-center text-3xl px-0 py-0"
        type="number"
        id="strength"
        value={sheet?.data?.level}
        onChange={(e) => setSheet({ ...sheet?.data, level: e.target.value })}
      />
      <h1 className={"uppercase font-medium"}>STRENGTH</h1>
      <Input
        className="w-16 h-16 text-center text-3xl px-0 py-0"
        id="strength"
        value={
          (sheet?.data?.stats?.strength > 0 && "+") +
          sheet?.data?.stats?.strength
        }
      />
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="strength"
        type={"number"}
        min={3}
        max={18}
        value={sheet?.data?.thrownStats?.strength}
        onChange={(e) =>
          setSheet({
            ...sheet,
            data: {
              ...sheet?.data,
              stats: {
                ...sheet?.data?.stats,
                strength: Math.floor(Number(e.target.value) - 10 / 2),
              },
              thrownStats: {
                ...sheet?.data?.thrownStats,
                strength: e.target.value,
              },
            },
          })
        }
      />
      <h1 className={"uppercase font-medium"}>DEXTERITY</h1>
      <Input
        className="w-16 h-16 text-center text-3xl px-0 py-0"
        value={
          (sheet?.data?.stats?.dexterity > 0 && "+") +
          sheet?.data?.stats?.dexterity
        }
        id="dexterity"
      />
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="dexterity"
        type={"number"}
        min={3}
        max={18}
        value={sheet?.data?.thrownStats?.dexterity}
        onChange={(e) =>
          setSheet({
            ...sheet,
            data: {
              ...sheet?.data,
              stats: {
                ...sheet?.data.stats,
                dexterity: Math.floor(Number(e.target.value) - 10 / 2),
              },
              thrownStats: {
                ...sheet?.data.thrownStats,
                dexterity: e.target.value,
              },
            },
          })
        }
      />
      <h1 className={"uppercase font-medium"}>CONSTITUTION</h1>
      <Input
        value={
          (sheet?.data?.stats?.constitution > 0 && "+") +
          sheet?.data?.stats?.constitution
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
        value={sheet?.data?.thrownStats?.constitution}
        onChange={(e) =>
          setSheet({
            ...sheet,
            data: {
              ...sheet?.data,
              stats: {
                ...sheet?.data?.stats,
                constitution: Math.floor(Number(e.target.value) - 10 / 2),
              },
              thrownStats: {
                ...sheet?.data?.thrownStats,
                constitution: e.target.value,
              },
            },
          })
        }
      />
      <h1 className={"uppercase font-medium"}>INTELLIGENCE</h1>
      <Input
        value={
          (sheet?.data?.stats?.intelligence > 0 && "+") +
          sheet?.data?.stats?.intelligence
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
        value={sheet?.data?.thrownStats?.intelligence}
        onChange={(e) =>
          setSheet({
            ...sheet,
            data: {
              ...sheet?.data,
              stats: {
                ...sheet?.data?.stats,
                intelligence: Math.floor(Number(e.target.value) - 10 / 2),
              },
              thrownStats: {
                ...sheet?.data?.thrownStats,
                intelligence: e.target.value,
              },
            },
          })
        }
      />
      <h1 className={"uppercase font-medium"}>WISDOM</h1>
      <Input
        value={
          (sheet?.data?.stats?.wisdom > 0 && "+") + sheet?.data?.stats?.wisdom
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
        value={sheet?.data?.thrownStats?.wisdom}
        onChange={(e) =>
          setSheet({
            ...sheet,
            data: {
              ...sheet?.data,
              stats: {
                ...sheet?.data?.stats,
                wisdom: Math.floor(Number(e.target.value) - 10 / 2),
              },
              thrownStats: {
                ...sheet?.data.thrownStats,
                wisdom: e.target.value,
              },
            },
          })
        }
      />
      <h1 className={"uppercase font-medium"}>CHARISMA</h1>
      <Input
        value={
          (sheet?.data?.stats?.charisma > 0 && "+") +
          sheet?.data?.stats?.charisma
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
        value={sheet?.data?.thrownStats?.charisma}
        onChange={(e) =>
          setSheet({
            ...sheet,
            data: {
              ...sheet?.data,
              stats: {
                ...sheet?.data.stats,
                charisma: Math.floor(Number(e.target.value) - 10 / 2),
              },
              thrownStats: {
                ...sheet?.data.thrownStats,
                charisma: e.target.value,
              },
            },
          })
        }
      />
    </section>
  );
};
