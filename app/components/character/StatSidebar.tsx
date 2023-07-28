/* eslint-disable no-unused-vars */
"use client";
import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../common/Input";

export const StatEntry = ({
  sheet,
  title,
  sheetId,
  calculateStat,
  setSheet,
}: {
  sheet: any;
  title: string;
  sheetId: string;
  calculateStat: (thrownStat: number | string) => number;
  setSheet: any;
}) => {
  return (
    <>
      <h1 className={"uppercase font-medium"}>{title}</h1>
      <div
        className="bg-light-primary text-light-secondary w-16 h-16 text-center flex justify-center items-center text-3xl px-0 py-0"
        id={title}
      >
        {sheet?.data?.stats?.[title] > 0
          ? "+" + sheet?.data?.stats?.[title]
          : sheet.data?.stats?.[title]}
      </div>
      <input
        className="bg-light-primary w-8 h-8 text-center flex justify-center text-light-secondary items-center p-0 text-sm rounded-none"
        id={title}
        type={"number"}
        min={3}
        max={18}
        value={sheet?.data?.thrownStats?.[title]}
        onChange={(e) =>
          updateSheetWithId(
            sheetId,
            {
              ...sheet?.data,
              thrownStats: {
                ...sheet?.data?.thrownStats,
                [title]: e.target.value,
              },
              stats: {
                ...sheet?.data?.stats,
                [title]: calculateStat(e.target.value),
              },
            },
            sheet?.campaign,
            sheet?.user
          )
            .then((res) => {
              toast.success(`Updated ${title}`);
              setSheet(res);
            })
            .catch(() => {
              toast.error(`Something went wrong while updating ${title}`);
            })
        }
      />
    </>
  );
};

export const StatSidebar = ({ sheetId }: { sheetId: string }) => {
  const [sheet, setSheet] = useState<any>({});

  useEffect(() => {
    getSheetWithId(sheetId).then((res) => {
      setSheet(res);
    });
  }, []);

  useEffect(() => {
    console.log(sheetId);
    console.log(sheet);
  }, [sheet]);

  function calculateStat(thrownStat: number | string): number {
    return Math.floor((Number(thrownStat) - 10) / 2);
  }

  return (
    <section className="flex w-48 pt-5 gap-2 bg-light-secondary text-light-text flex-col h-full items-center px-12">
      <h1 className={"uppercase font-medium"}>Level</h1>
      <Input
        className="bg-light-primary w-16 h-16 text-center text-3xl px-0 py-0"
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
      <StatEntry
        sheet={sheet}
        title={"strength"}
        sheetId={sheetId}
        calculateStat={calculateStat}
        setSheet={setSheet}
      />
      <StatEntry
        sheet={sheet}
        title={"dexterity"}
        sheetId={sheetId}
        calculateStat={calculateStat}
        setSheet={setSheet}
      />
      <StatEntry
        sheet={sheet}
        title={"constitution"}
        sheetId={sheetId}
        calculateStat={calculateStat}
        setSheet={setSheet}
      />
      <StatEntry
        sheet={sheet}
        title={"intelligence"}
        sheetId={sheetId}
        calculateStat={calculateStat}
        setSheet={setSheet}
      />
      <StatEntry
        sheet={sheet}
        title={"wisdom"}
        sheetId={sheetId}
        calculateStat={calculateStat}
        setSheet={setSheet}
      />
      <StatEntry
        sheet={sheet}
        title={"charisma"}
        sheetId={sheetId}
        calculateStat={calculateStat}
        setSheet={setSheet}
      />
    </section>
  );
};
