import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);
pb.autoCancellation(false);

export function getAllSheets({ userId }: { userId: string }) {
  console.log(userId);
  return pb
    .collection("sheets")
    .getFullList(200, { filter: `user.id = "${userId}"` });
}

export function getAllUsers() {
  return pb.collection("users").getFullList(200);
}

export function getAllCampaigns() {
  return pb.collection("campaigns").getFullList(200);
}

export function getUserFromUserId(userId: string) {
  return pb.collection("users").getOne(userId);
}

export function getSheetWithCampaignIdAndUserId(
  campaignId: string,
  userId: string
) {
  return pb
    .collection("sheets")
    .getFirstListItem(`campaign.id="${campaignId}" && user.id="${userId}"`);
}

export function updateCampaign(campaignId: string, data: any) {
  return pb.collection("campaigns").update(campaignId, data);
}

export function getCampaignById(campaignId: string) {
  return pb.collection("campaigns").getOne(campaignId);
}

export function getSheetWithId(sheetId: string) {
  return pb.collection("sheets").getOne(sheetId);
}

export function updateSheetWithId(
  sheetId: string,
  sheet: any,
  campaignId: string | undefined,
  userId: string
) {
  return pb.collection("sheets").update(sheetId, {
    data: sheet,
    campaign: campaignId ? campaignId : null,
    user: userId,
  });
}
