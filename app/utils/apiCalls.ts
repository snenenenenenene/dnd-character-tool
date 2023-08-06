import { classes } from "@/data/classes/classes";
import { races } from "@/data/races/races";
import PocketBase from "pocketbase";
import { SheetData } from "./store";

const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);
pb.autoCancellation(false);

export async function getAllSheets({ userId }: { userId: string }) {
  return await pb
    .collection("sheets")
    .getFullList(200, { filter: `user.id = "${userId}"`, expand: "campaign" });
}

export async function getAllUsers() {
  return await pb.collection("users").getFullList(200);
}

export async function getAllCampaigns() {
  return await pb.collection("campaigns").getFullList(200);
}

export async function createCampaign({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) {
  return await pb.collection("campaigns").create({
    users: [],
    dm: userId,
    name: name,
  });
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
  return await pb.collection("sheets").getOne(sheetId, {
    expand: "user",
  });
}

export async function addSheet({
  characterName,
  userId,
  campaignId,
}: {
  characterName: string;
  userId: string;
  campaignId?: string;
}) {
  const sheet: SheetData = {
    name: characterName || "Lyra",
    class: [classes[0]],
    level: 0,
    race: races[0],
    background: "Criminal",
    personality: {
      alignment: "Chaotic Neutral",
    },
    experiencePoints: 3000,
    thrownStats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    stats: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },

    inspiration: true,
    proficiencies: {
      acrobatics: true,
      deception: true,
      persuasion: true,
      "thieves' tools": true,
    },
    armourClass: 16,
    initiative: 4,
    speed: 30,
    hitPoints: {
      max: 38,
      current: 28,
      temporary: 0,
    },
    deathSaves: {
      successes: 1,
      failures: 2,
    },
    attacks: [
      {
        name: "Shortsword",
        bonus: 7,
        damage: "1d6+4",
      },
      {
        name: "Shortbow",
        bonus: 7,
        damage: "1d6+4",
      },
    ],
    equipment: [
      {
        name: "Shortsword",
        quantity: 2,
      },
      {
        name: "Shortbow",
        quantity: 1,
      },
      {
        name: "Arrows",
        quantity: 20,
      },
      {
        name: "Thieves' tools",
        quantity: 1,
      },
    ],
    skills: {},
    currency: {},
    weapons: [],
    spells: [],
  };

  return pb.collection("sheets").create({
    data: sheet,
    user: userId,
    campaign: campaignId || null,
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

export async function deleteSheetWithId({
  sheetId,
  userId,
}: {
  sheetId: string;
  userId: string;
}) {
  return await pb.collection("sheets").delete(sheetId, {
    user: userId,
  });
}
