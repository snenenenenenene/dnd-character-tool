/* eslint-disable no-unused-vars */
// import { classes } from "@/data/classes/classes";
// import { Class } from "@/data/classes/types";
// import { races } from "@/data/races/races";
// import { Race } from "@/data/races/types";
import { classes } from "@/data/classes/classes";
import { Class, SkillTypes } from "@/data/classes/types";
import { races } from "@/data/races/races";
import { Race } from "@/data/races/types";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import PocketBase from "pocketbase";
import { toast } from "react-toastify";
import { updateCampaign } from "./apiCalls";
import { THEME_TYPES } from "./themeUtils";

export interface SheetData {
  name: string;
  level: number;
  armourClass: number;
  initiative: number;
  speed: number;
  hitPoints: {
    current: number;
    max: number;
    temp: number;
  };
  stats?: Stats;
  skills: {
    acrobatics?: number;
    animalHandling?: number;
    arcana?: number;
    athletics?: number;
    deception?: number;
    history?: number;
    insight?: number;
    intimidation?: number;
    investigation?: number;
    medicine?: number;
    nature?: number;
    perception?: number;
    performance?: number;
    persuasion?: number;
    religion?: number;
    sleightOfHand?: number;
    stealth?: number;
    survival?: number;
  };
  savingThrows?: Stats;
  currency: {
    gold?: number;
    silver?: number;
    copper?: number;
    electrum?: number;
    platinum?: number;
  };
  weapons: [];
  thrownStats: Stats;
  race: Race;
  class: Class[];
}
interface SheetUpdate {
  name?: string;
  race?: Race;
  class?: Class[];
}

interface Stats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Sheet {
  id: string;
  data: SheetData;
  campaign: string;
  user: string;
}

interface Campaign {
  name: string;
  sheets: Sheet[];
}

type StoreState = {
  user: any;
  setUser: (user: any) => void | any;
  theme: string | any;
  toggleTheme: () => void | any;
  selectedCampaign: Campaign | null | any;
  selectedSheet: Sheet | null | any;
  setSelectedCampaign: (campaign: Campaign) => void | any;
  setSelectedSheet: (sheet: Sheet) => void | any;
};

const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);
const { THEME_LIGHT, THEME_DARK } = THEME_TYPES;
export const useSheetStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        theme: THEME_LIGHT,
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT,
          })),
        user: null,
        setUser: (user) => set({ user }),
        selectedCampaign: null,
        selectedSheet: null,
        setSelectedCampaign: (campaign) => {
          set({ selectedCampaign: campaign });
        },
        setSelectedSheet: (sheet) => {
          set({ selectedSheet: sheet });
        },
      }),
      {
        name: "sheet-storage",
      }
    )
  )
);
