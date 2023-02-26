/* eslint-disable no-unused-vars */
// import { classes } from "@/data/classes/classes";
// import { Class } from "@/data/classes/types";
// import { races } from "@/data/races/races";
// import { Race } from "@/data/races/types";
import { classes } from "@/data/classes/classes";
import { Class } from "@/data/classes/types";
import { races } from "@/data/races/races";
import { Race } from "@/data/races/types";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
// import { Sheet } from "../components/sheets/List";

// interface State {
//   sheets: Array<Sheet>;
//   selectedSheet: Sheet | null;
//   setSelectedSheet: (sheet: Sheet | null) => void;
//   selectSheetByName: (name: string) => any;
//   updateSelectedSheet: (update: SheetUpdate) => void;

//   addSheet: (sheet: Sheet) => void;
// }

export interface Sheet {
  name: string;
  level?: number;
  stats?: {
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
  };
  thrownStats?: {
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
  };
  race: Race;
  class: Class[];
}
interface SheetUpdate {
  name?: string;
  race?: Race;
  class?: Class[];
}

// export interface Store {
//   sheets: Sheet[];
//   selectedSheet: Sheet | null;
//   selectSheet: (name: string) => void;
//   updateSelectedSheet: (update: SheetUpdate) => void;
//   addSheet: (name: string) => void;
// }

type StoreState = {
  sheets?: Sheet[] | any;
  selectedSheet?: Sheet | null | any;
  selectSheet?: (name: string) => void | any;
  updateSelectedSheet: (update: SheetUpdate) => void | any;
  addSheet?: (name: string) => void | any;
};

export const useSheetStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        sheets: [],
        selectedSheet: null,
        selectSheet: (name: string) =>
          set((state) => ({
            selectedSheet:
              state.sheets.find((sheet: Sheet) => sheet.name === name) || null,
          })),
        updateSelectedSheet: (update: SheetUpdate) =>
          set((state) => {
            if (state.selectedSheet) {
              const updatedSheet = {
                ...state.selectedSheet,
                ...update,
              };
              const sheets = state.sheets.map((sheet: Sheet) =>
                sheet.name === updatedSheet.name ? updatedSheet : sheet
              );
              return {
                ...state,
                sheets,
                selectedSheet: updatedSheet,
              };
            }
            return state;
          }),
        addSheet: (name: string) =>
          set((state) => {
            const sheet: Sheet = {
              name,
              race: races[0],
              class: [classes[0], classes[1]],
            };
            return {
              sheets: [...state.sheets, sheet],
              selectedSheet: sheet,
            };
          }),
      }),
      {
        name: "sheet-storage",
      }
    )
  )
);

// export const useSheetStore = create<StoreState>((set, _get, api) => ({
//   //TODO: add this to the old store
//   sheets: [],
//   selectedSheet: null,
//   selectSheet: (name: string) =>
//     set((state) => ({
//       selectedSheet: state.sheets.find((sheet) => sheet.name === name) || null,
//     })),
//   updateSelectedSheet: (update: SheetUpdate) =>
//     set((state) => {
//       if (state.selectedSheet) {
//         const updatedSheet = {
//           ...state.selectedSheet,
//           ...update,
//         };
//         const sheets = state.sheets.map((sheet) =>
//           sheet.name === updatedSheet.name ? updatedSheet : sheet
//         );
//         return {
//           ...state,
//           sheets,
//           selectedSheet: updatedSheet,
//         };
//       }
//       return state;
//     }),
//   addSheet: (name: string) =>
//     set((state) => {
//       const sheet: Sheet = {
//         name,
//         race: races[0],
//         class: [classes[0], classes[1]],
//       };
//       return {
//         sheets: [...state.sheets, sheet],
//         selectedSheet: sheet,
//       };
//     }),
// }));
