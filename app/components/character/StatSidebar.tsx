"use client";
import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import React, { useEffect, useState } from "react";
import { Input } from "../common/Input";

export const StatSidebar = ({ sheetId }: { sheetId: string }) => {
  const [sheet, setSheet] = useState<any>({});

  useEffect(() => {
    getSheetWithId(sheetId).then((res) => {
      setSheet(res);
    });
  }, []);

  function calculateStat(thrownStat: number | string): number {
    return Math.floor((Number(thrownStat) - 10) / 2);
  }

  return (
    <section className="flex w-48 fixed right-0 top-0 pt-5 gap-2 border-light-secondary border-l-2 flex-col h-full items-center px-12">
      <h1 className={"uppercase font-medium"}>Level</h1>
      <Input
        className="w-16 h-16 text-center text-3xl px-0 py-0"
        type="number"
        id="strength"
        value={sheet?.data?.level}
        onChange={(e) =>
          updateSheetWithId(
            sheetId,
            {
              ...sheet?.data,
              level: Number(e.target.value),
            },
            sheet?.campaign,
            sheet?.user
          )
            .then((res) => {
              console.log(res);
              setSheet(res);
            })
            .catch((err) => {
              console.log(err);
            })
        }
      />
      <h1 className={"uppercase font-medium"}>STRENGTH</h1>
      <div className="w-16 h-16 text-center text-3xl px-0 py-0" id="strength">
        {sheet?.data?.stats?.strength > 0
          ? "+" + sheet?.data?.stats?.strength
          : sheet.data?.stats?.strength}
      </div>
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="strength"
        type={"number"}
        min={3}
        max={18}
        value={sheet?.data?.thrownStats?.strength}
        onChange={(e) =>
          updateSheetWithId(
            sheetId,
            {
              ...sheet?.data,
              thrownStats: {
                ...sheet?.data?.thrownStats,
                strength: e.target.value,
              },
              stats: {
                ...sheet?.data?.stats,
                strength: calculateStat(e.target.value),
              },
            },
            sheet?.campaign,
            sheet?.user
          )
            .then((res) => {
              console.log(res);
              setSheet(res);
            })
            .catch((err) => {
              console.log(err);
            })
        }
      />
      <h1 className={"uppercase font-medium"}>DEXTERITY</h1>
      <div className="w-16 h-16 text-center text-3xl px-0 py-0" id="dexterity">
        {sheet?.data?.stats?.dexterity > 0
          ? "+" + sheet?.data?.stats?.dexterity
          : sheet.data?.stats?.dexterity}
      </div>
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="dexterity"
        type={"number"}
        min={3}
        max={18}
        value={sheet?.data?.thrownStats?.dexterity}
        onChange={(e) =>
          updateSheetWithId(
            sheetId,
            {
              ...sheet?.data,
              thrownStats: {
                ...sheet?.data?.thrownStats,
                dexterity: e.target.value,
              },
              stats: {
                ...sheet?.data?.stats,
                dexterity: calculateStat(e.target.value),
              },
            },
            sheet?.campaign,
            sheet?.user
          )
            .then((res) => {
              console.log(res);
              setSheet(res);
            })
            .catch((err) => {
              console.log(err);
            })
        }
      />
      <h1 className={"uppercase font-medium"}>CONSTITUTION</h1>
      <div className="w-16 h-16 text-center text-3xl px-0 py-0" id="dexterity">
        {sheet?.data?.stats?.constitution > 0
          ? "+" + sheet?.data?.stats?.constitution
          : sheet.data?.stats?.constitution}
      </div>
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="constitution"
        type={"number"}
        min={3}
        max={18}
        value={sheet?.data?.thrownStats?.constitution}
        onChange={(e) =>
          updateSheetWithId(
            sheetId,
            {
              ...sheet?.data,
              thrownStats: {
                ...sheet?.data?.thrownStats,
                constitution: e.target.value,
              },
              stats: {
                ...sheet?.data?.stats,
                constitution: calculateStat(e.target.value),
              },
            },
            sheet?.campaign,
            sheet?.user
          )
            .then((res) => {
              console.log(res);
              setSheet(res);
            })
            .catch((err) => {
              console.log(err);
            })
        }
      />
      <h1 className={"uppercase font-medium"}>INTELLIGENCE</h1>
      <div
        className="w-16 h-16 text-center text-3xl px-0 py-0"
        id="intelligence"
      >
        {sheet?.data?.stats?.intelligence > 0
          ? "+" + sheet?.data?.stats?.intelligence
          : sheet.data?.stats?.intelligence}
      </div>
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="constitution"
        type={"number"}
        min={3}
        max={18}
        value={sheet?.data?.thrownStats?.intelligence}
        onChange={(e) =>
          updateSheetWithId(
            sheetId,
            {
              ...sheet?.data,
              thrownStats: {
                ...sheet?.data?.thrownStats,
                intelligence: e.target.value,
              },
              stats: {
                ...sheet?.data?.stats,
                intelligence: calculateStat(e.target.value),
              },
            },
            sheet?.campaign,
            sheet?.user
          )
            .then((res) => {
              console.log(res);
              setSheet(res);
            })
            .catch((err) => {
              console.log(err);
            })
        }
      />
      <h1 className={"uppercase font-medium"}>WISDOM</h1>
      <div className="w-16 h-16 text-center text-3xl px-0 py-0" id="wisdom">
        {sheet?.data?.stats?.wisdom > 0
          ? "+" + sheet?.data?.stats?.wisdom
          : sheet.data?.stats?.wisdom}
      </div>
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="constitution"
        type={"number"}
        min={3}
        max={18}
        value={sheet?.data?.thrownStats?.wisdom}
        onChange={(e) =>
          updateSheetWithId(
            sheetId,
            {
              ...sheet?.data,
              thrownStats: {
                ...sheet?.data?.thrownStats,
                wisdom: e.target.value,
              },
              stats: {
                ...sheet?.data?.stats,
                wisdom: calculateStat(e.target.value),
              },
            },
            sheet?.campaign,
            sheet?.user
          )
            .then((res) => {
              console.log(res);
              setSheet(res);
            })
            .catch((err) => {
              console.log(err);
            })
        }
      />
      <h1 className={"uppercase font-medium"}>CHARISMA</h1>
      <div className="w-16 h-16 text-center text-3xl px-0 py-0" id="charisma">
        {sheet?.data?.stats?.charisma > 0
          ? "+" + sheet?.data?.stats?.charisma
          : sheet.data?.stats?.charisma}
      </div>
      <input
        className="w-8 h-8 text-center flex items-center p-0 text-sm rounded-none"
        id="constitution"
        type={"number"}
        min={3}
        max={18}
        value={sheet?.data?.thrownStats?.charisma}
        onChange={(e) =>
          updateSheetWithId(
            sheetId,
            {
              ...sheet?.data,
              thrownStats: {
                ...sheet?.data?.thrownStats,
                charisma: e.target.value,
              },
              stats: {
                ...sheet?.data?.stats,
                charisma: calculateStat(e.target.value),
              },
            },
            sheet?.campaign,
            sheet?.user
          )
            .then((res) => {
              console.log(res);
              setSheet(res);
            })
            .catch((err) => {
              console.log(err);
            })
        }
      />
    </section>
  );
};
