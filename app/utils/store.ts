/* eslint-disable no-unused-vars */
// import { classes } from "@/data/classes/classes";
// import { Class } from "@/data/classes/types";
// import { races } from "@/data/races/races";
// import { Race } from "@/data/races/types";
import { Class } from "@/data/classes/types";
import { Race } from "@/data/races/types";
import PocketBase from "pocketbase";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { THEME_TYPES } from "./themeUtils";

export interface SheetData {
  name: string;
  level: number;
  background: string;
  armourClass: number;
  initiative: number;
  alignment: string;
  inspiration: boolean;
  deathSaves: {
    successes: number;
    failures: number;
  };
  experiencePoints: number;
  proficiencies: any;
  speed: number;
  hitPoints: {
    current: number;
    max: number;
    temporary: number;
  };
  stats?: Stats;
  attacks: {
    name: string;
    bonus: number;
    damage: string;
  }[];
  equipment: {
    name: string;
    quantity: number;
  }[];
  spells: {
    name: string;
    level: number;
    description: string;
    prepared: boolean;
  }[];
  skills: {
    acrobatics?: number;
    "animal handling"?: number;
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
    "sleight of hand"?: number;
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
  expand?: any;
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
