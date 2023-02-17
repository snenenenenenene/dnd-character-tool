/* eslint-disable no-unused-vars */
import { classes } from "@/data/classes/classes";
import { Class } from "@/data/classes/types";
import { races } from "@/data/races/races";
import { Race } from "@/data/races/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Sheet } from "../components/sheets/List";

interface sheetstate {
  sheets: Array<Sheet>;
  currentSheet: Sheet;
  setRace: (race: Race) => void;
  setClass: (_class: Class[] | []) => void;
  removeClass: (index: number) => void;
  setCurrentSheet: (name: string) => void;
  updateCurrentSheet: (key: string, value: any) => void;

  addSheet: (sheet: Sheet) => void;
}

export const useSheetStore = create<sheetstate>()(
  devtools(
    persist(
      (set) => ({
        sheets: [
          { name: "Aperepne", race: races[1], class: [classes[0], classes[1]] },
        ],
        setCurrentSheet: (name: string) =>
          set((state) => ({
            currentSheet: state.sheets.find((s) => name === s.name),
          })),
        updateCurrentSheet: (key, value) =>
          set((state) => ({
            currentSheet: { ...state.currentSheet, key: value },
          })),
        currentSheet: {
          name: "default",
          race: races[0],
          class: [classes[0], classes[1]],
        },
        setRace: (race: Race) =>
          set((state: any) => ({
            currentSheet: { ...state.currentSheet, race: race },
          })),
        setClass: (_class: Class[]) =>
          set((state: any) => ({
            currentSheet: { ...state.currentSheet, class: _class },
          })),
        removeClass: (index: number) =>
          set((state: any) => ({
            currentSheet: {
              ...state.currentSheet,
              class: state.currentSheet.class.filter(
                (c: Class, i: number) => i !== index
              ),
            },
          })),
        addSheet: (sheet) =>
          set((state) => ({ sheets: [...state.sheets, sheet] })),
      }),

      {
        name: "sheet-storage",
      }
    )
  )
);
