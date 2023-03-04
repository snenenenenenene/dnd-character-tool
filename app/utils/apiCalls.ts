import { races } from "@/data/races/races";
import PocketBase from "pocketbase";
import { Sheet } from "./store";

const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);
pb.autoCancellation(false);

export async function getAllSheets({ userId }: { userId: string }) {
  console.log(userId);
  return await pb
    .collection("sheets")
    .getFullList(200, { filter: `user.id = "${userId}"` });
}

export async function getAllUsers() {
  return await pb.collection("users").getFullList(200);
}

export async function getAllCampaigns() {
  return await pb.collection("campaigns").getFullList(200);
}

export async function getUserFromUserId(userId: string) {
  return await pb.collection("users").getOne(userId);
}

export async function getSheetWithCampaignIdAndUserId(
  campaignId: string,
  userId: string
) {
  return await pb
    .collection("sheets")
    .getFirstListItem(`campaign.id="${campaignId}" && user.id="${userId}"`);
}

export async function updateCampaign(campaignId: string, data: any) {
  return await pb.collection("campaigns").update(campaignId, data);
}

export async function getCampaignById(campaignId: string) {
  return await pb.collection("campaigns").getOne(campaignId);
}

export async function getSheetWithId(sheetId: string) {
  return await pb.collection("sheets").getOne(sheetId);
}

export async function addSheet(
  name: string,
  userId: string,
  campaignId?: string
) {
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
    stats: {
      strength: -4,
      dexterity: -4,
      constitution: -4,
      intelligence: -4,
      wisdom: -4,
      charisma: -4,
    },
  };

  return pb.collection("sheets").create({
    data: sheet,
    user: userId,
    campaign: campaignId ? campaignId : null,
  });
}

export async function updateSheetWithId(
  sheetId: string,
  sheet: any,
  campaignId: string | undefined,
  userId: string
) {
  return await pb.collection("sheets").update(sheetId, {
    data: sheet,
    campaign: campaignId ? campaignId : null,
    user: userId,
  });
}
