import PocketBase from "pocketbase";

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
