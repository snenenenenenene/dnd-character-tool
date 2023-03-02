"use client";
import React, { useEffect, useState } from "react";
import { GiDiamondHilt } from "react-icons/gi";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { List } from "../components/sheets/List";
import { useSheetStore } from "../utils/store";
import Select from "react-select";
import { getAllCampaigns, getAllSheets } from "../utils/apiCalls";

export default function SheetList() {
  const [showTitleModal, setShowTitleModal] = useState<boolean>(false);
  const [characterName, setCharacterName] = useState<string>("");
  const [options, setOptions] = useState<any>([]);
  const [sheets, setSheets]: any = useState();
  const [campaign, setCampaign] = useState<string>();
  const user = useSheetStore((state) => state.user);
  const addSheet = useSheetStore((state) => state.addSheet);

  async function createCharacter() {
    if (characterName && characterName !== "") {
      await addSheet(characterName, campaign);
      getAllSheets({ userId: user?.record?.id }).then((res) => {
        setSheets(res);
      });
      setShowTitleModal(false);
    }
  }
  useEffect(() => {
    getAllCampaigns().then((res) => {
      const mappedCampaigns = res.map((campaign: any) => {
        return {
          value: campaign.id,
          label: campaign.name,
        };
      });

      setOptions(mappedCampaigns);
    });

    getAllSheets({ userId: user?.record?.id })
      .then((res) => {
        console.log(user.record);
        console.log(res);
        setSheets(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <List sheets={sheets} />
      <button
        id="add-sheet-button"
        className="absolute bottom-5 right-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
        onClick={() => setShowTitleModal((showTitleModal) => !showTitleModal)}
      >
        <GiDiamondHilt />
      </button>

      {showTitleModal && (
        <div
          id="modal-background"
          className="w-screen flex justify-center items-center h-screen absolute inset-0 bg-[#00000060]"
          typeof="button"
          data-value="parent"
          onClick={(e) => {
            e.preventDefault();
            let dataValue = (e.target as HTMLElement).getAttribute(
              "data-value"
            );
            if (dataValue === "parent") {
              setShowTitleModal((showTitleModal) => !showTitleModal);
            }
          }}
        >
          <div
            id="modal-foreground"
            data-value="child"
            className="w-1/3 h-1/2 min-w-[500px] flex flex-col justify-center gap-8 items-center bg-light-secondary rounded-md"
          >
            <Input
              value={characterName}
              className="w-80"
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Character name"
            />

            <Select
              options={options}
              onChange={(campaign: any) => setCampaign(campaign.value)}
              noOptionsMessage={() => "No campaigns found"}
              placeholder="Select a campaign"
            />
            <Button onClick={() => createCharacter()}>Create</Button>
          </div>
        </div>
      )}
    </>
  );
}
