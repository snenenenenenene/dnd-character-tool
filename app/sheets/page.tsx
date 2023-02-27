"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiDiamondHilt } from "react-icons/gi";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { List } from "../components/sheets/List";
import { useSheetStore } from "../utils/store";
import PocketBase from "pocketbase";
import Select from "react-select";

export default function SheetList() {
  const sheets = useSheetStore((state) => state.sheets);
  const [showTitleModal, setShowTitleModal] = useState<boolean>(false);
  const [characterName, setCharacterName] = useState<string>();
  const [options, setOptions]: any = useState();
  const [campaign, setCampaign] = useState();

  const addSheet: any = useSheetStore((state) => state.addSheet);
  const selectSheet: any = useSheetStore((state) => state.selectSheet);
  const selectedSheet = useSheetStore((state) => state.selectedSheet);
  const user = useSheetStore((state) => state.user);
  const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

  const router = useRouter();

  async function createCharacter() {
    if (characterName && characterName !== "") {
      await addSheet(characterName);

      const data = {
        data: selectedSheet,
        user: user.record.id,
        campaign: campaign,
      };
      await pb
        .collection("sheets")
        .create(data)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });

      if (selectedSheet) {
        await selectSheet(selectedSheet.name);
        router.push(`/sheets/${selectedSheet?.name}`);
      }
    }
  }

  useEffect(() => {
    pb.collection("sheets")
      .getFullList(200)
      .then((res: any) => {
        console.log(res);
      });
  }, []);

  useEffect(() => {
    pb.collection("campaigns")
      .getFullList(200)
      .then((res: any) => {
        console.log("AAAAAAAAAAAAAAAAA");
        console.log(res);
        const options = res.map((campaign: any) => {
          return {
            value: campaign.id,
            label: campaign.name,
          };
        });
        console.log(options);
        setOptions(options);
      });
  }, []);

  return (
    <div>
      <List sheets={sheets} />
      <button
        className="absolute bottom-5 right-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
        onClick={() => setShowTitleModal((showTitleModal) => !showTitleModal)}
      >
        <GiDiamondHilt />
      </button>

      {showTitleModal && (
        <div
          className="w-screen flex justify-center items-center h-screen absolute inset-0 bg-[#00000060]"
          typeof="button"
          data-value="parent"
          onClick={(event: any) => {
            event.preventDefault();
            let dataValue = (event.target as HTMLElement).getAttribute(
              "data-value"
            );
            if (dataValue === "parent") {
              setShowTitleModal((showTitleModal) => !showTitleModal);
            }
          }}
        >
          <div
            data-value="child"
            className="w-1/3 h-1/2 min-w-[500px] flex flex-col justify-center gap-8 items-center bg-light-secondary rounded-md"
          >
            <Input
              value={characterName}
              className="w-80"
              onChange={(e: any) => setCharacterName(e.target.value)}
              placeholder="Character name"
            />

            {/* //TODO: ADD A CAMPAIGN SELECT */}
            <Select
              options={options}
              onChange={(campaign: any) => setCampaign(campaign.value)}
              placeholder="Select a campaign"
            />
            <Button onClick={() => createCharacter()}>Create</Button>
          </div>
        </div>
      )}
    </div>
  );
}
