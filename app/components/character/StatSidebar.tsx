/* eslint-disable no-unused-vars */
"use client";
import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import { Sheet, useSheetStore } from "@/app/utils/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Input } from "../common/Input";

export const StatEntry = ({
  selectedSheet,
  title,
  sheetId,
  calculateStat,
  setSelectedSheet,
}: {
  selectedSheet: any;
  title: string;
  sheetId: string;
  calculateStat: (thrownStat: number | string) => number;
  setSelectedSheet: Sheet;
}) => {
  return (
    <>
      <h1 className={"uppercase font-medium"}>{title}</h1>
      <div
        className="bg-light-primary text-light-secondary w-16 h-16 text-center flex justify-center items-center text-3xl px-0 py-0"
        id={title}
      >
        {selectedSheet?.data?.stats?.[title] > 0
          ? "+" + selectedSheet?.data?.stats?.[title]
          : selectedSheet.data?.stats?.[title]}
      </div>
      <input
        className="bg-light-primary w-8 h-8 text-center flex justify-center text-light-secondary items-center p-0 text-sm rounded-none"
        id={title}
        type={"number"}
        min={3}
        max={18}
        value={selectedSheet?.data?.thrownStats?.[title]}
        onChange={(e) =>
          updateSheetWithId(
            sheetId,
            {
              ...selectedSheet?.data,
              thrownStats: {
                ...selectedSheet?.data?.thrownStats,
                [title]: e.target.value,
              },
              stats: {
                ...selectedSheet?.data?.stats,
                [title]: calculateStat(e.target.value),
              },
            },
            selectedSheet?.campaign,
            selectedSheet?.user
          )
            .then((res) => {
              toast.success(`Updated ${title}`);
              setSelectedSheet(res);
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
  const selectedSheet: any = useSheetStore((state) => state.selectedSheet);
  const setSelectedSheet: any = useSheetStore(
    (state) => state.setSelectedSheet
  );

  useEffect(() => {
    getSheetWithId(sheetId).then((res) => {
      setSelectedSheet(res);
    });
  }, []);

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
        value={selectedSheet?.data?.level}
        onChange={(e) =>
          updateSheetWithId(
            sheetId,
            {
              ...selectedSheet?.data,
              level: Number(e.target.value),
            },
            selectedSheet?.campaign,
            selectedSheet?.user
          )
            .then((res) => {
              setSelectedSheet(res);
            })
            .catch((err) => {
              toast.error(err.message);
            })
        }
      />
      <StatEntry
        selectedSheet={selectedSheet}
        title={"strength"}
        sheetId={sheetId}
        calculateStat={calculateStat}
        setSelectedSheet={setSelectedSheet}
      />
      <StatEntry
        selectedSheet={selectedSheet}
        title={"dexterity"}
        sheetId={sheetId}
        calculateStat={calculateStat}
        setSelectedSheet={setSelectedSheet}
      />
      <StatEntry
        selectedSheet={selectedSheet}
        title={"constitution"}
        sheetId={sheetId}
        calculateStat={calculateStat}
        setSelectedSheet={setSelectedSheet}
      />
      <StatEntry
        selectedSheet={selectedSheet}
        title={"intelligence"}
        sheetId={sheetId}
        calculateStat={calculateStat}
        setSelectedSheet={setSelectedSheet}
      />
      <StatEntry
        selectedSheet={selectedSheet}
        title={"wisdom"}
        sheetId={sheetId}
        calculateStat={calculateStat}
        setSelectedSheet={setSelectedSheet}
      />
      <StatEntry
        selectedSheet={selectedSheet}
        title={"charisma"}
        sheetId={sheetId}
        calculateStat={calculateStat}
        setSelectedSheet={setSelectedSheet}
      />
    </section>
  );
};
