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
import PocketBase from "pocketbase";
import { toast } from "react-toastify";
import { updateCampaign } from "./apiCalls";
import { THEME_TYPES } from "./themeUtils";

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
  currency?: {
    gold?: number;
    silver?: number;
    copper?: number;
    electrum?: number;
    platinum?: number;
  };
  weapons?: [];
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

interface Campaign {
  name: string;
  sheets: Sheet[];
}

type StoreState = {
  user: any;
  setUser: (user: any) => void | any;
  campaigns: Campaign[] | any;
  sheets: Sheet[] | any;
  theme: string | any;
  toggleTheme: () => void | any;
  selectedCampaign: Campaign | null | any;
  selectedSheet: Sheet | null | any;
  selectCampaign: (name: string) => void | any;
  selectSheet: (name: string) => void | any;
  updateSelectedSheet: (update: SheetUpdate) => void | any;
  updateUsers: (users: any, campaignId: any, campaign: any) => void | any;
  addCampaign: (name: string) => void | any;
  addSheet: (name: string, campaignId?: string) => any;
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
        sheets: [],
        campaigns: [],
        selectedCampaign: null,
        selectedSheet: null,
        selectSheet: (name: string) =>
          set((state) => ({
            selectedSheet:
              state.sheets.find((sheet: Sheet) => sheet.name === name) || null,
          })),
        selectCampaign: (name: string) =>
          set((state) => ({
            selectedCampaign:
              state.campaigns.find(
                (campaign: Campaign) => campaign.name === name
              ) || null,
          })),
        updateUsers: (users, campaignId, campaign) =>
          set((state) => {
            const data = {
              users: users,
              dm: state.user.record.id,
              name: campaign.name,
            };

            updateCampaign(campaignId, data)
              .then((resp) => {
                // setCampaign(resp);
                toast.success("Campaign updated!");
              })
              .catch((err: any) => {
                console.error(err);
              });
            return state;
          }),
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
        addCampaign: (name: string) =>
          set((state) => {
            const campaign: Campaign = {
              name,
              sheets: [],
            };

            pb.collection("campaigns")
              .create({
                name: name,
                dm: state.user.record.id,
              })
              .then(() => {
                toast.success("Campaign created!");
              });

            return {
              campaigns: [...state.campaigns, campaign],
              selectedCampaign: campaign,
            };
          }),
        addSheet: (name, campaignId) =>
          set((state) => {
            const sheet: Sheet = {
              name,
              race: races[0],
              class: [],
              level: 0,
              currency: {
                gold: 0,
                silver: 0,
                copper: 0,
                electrum: 0,
                platinum: 0,
              },
              weapons: [],
              thrownStats: {
                strength: 3,
                dexterity: 3,
                constitution: 3,
                intelligence: 3,
                wisdom: 3,
                charisma: 3,
              },
            };

            pb.collection("sheets")
              .create({
                data: sheet,
                user: state.user.record.id,
                campaign: campaignId ? campaignId : null,
              })
              .then(() => {
                toast.success("Created sheet successfully");
              })
              .catch((err) => {
                toast.error("Failed to create sheet");
              });

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
