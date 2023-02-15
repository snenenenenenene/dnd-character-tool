/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface sheetstate {
  sheets: Array<{ name: string }>;
  addSheet: (sheet: { name: string }) => void;
}

export const useSheetStore = create<sheetstate>()(
  devtools(
    persist(
      (set) => ({
        sheets: [{ name: "Aperepne" }],
        addSheet: (sheet) =>
          set((state) => ({ sheets: [...state.sheets, sheet] })),
      }),
      {
        name: "sheet-storage",
      }
    )
  )
);
