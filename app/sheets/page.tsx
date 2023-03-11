"use client";
import React, { useEffect, useState } from "react";
import { GiDiamondHilt } from "react-icons/gi";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { List } from "../components/sheets/List";
import { useSheetStore } from "../utils/store";
import Select from "react-select";
import { addSheet, getAllCampaigns, getAllSheets } from "../utils/apiCalls";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Modal } from "../components/common/Modal";

export default function SheetList() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [characterName, setCharacterName] = useState<string>("");
  const [options, setOptions] = useState<any>([]);
  const [sheets, setSheets]: any = useState();
  const [campaign, setCampaign] = useState<string>();
  const user = useSheetStore((state) => state.user);
  const router = useRouter();

  async function createCharacter() {
    if (characterName && characterName !== "") {
      addSheet(characterName, user?.record?.id, campaign)
        .then((res: any) => {
          toast.success("Created sheet successfully");
          router.push(`/sheets/${res.id}/race`);
        })
        .catch(() => {
          toast.error("Failed to create sheet");
        });
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
        setSheets(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <section className="text-3xl font-bold flex items-center py-4 pl-5 border-b-2 border-light-secondary dark:border-dark-secondary uppercase">
        <h1>Sheets</h1>
      </section>
      <List sheets={sheets} />
      <button
        id="add-sheet-button"
        className="absolute bottom-5 right-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
        onClick={() => setShowModal(true)}
      >
        <GiDiamondHilt />
      </button>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <section className="flex w-full h-full pt-10 flex-col justify-center items-center gap-10">
          <Input
            value={characterName}
            className="w-1/2"
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="Character name"
          />

          <Select
            className="w-1/2"
            options={options}
            onChange={(campaign: any) => setCampaign(campaign.value)}
            noOptionsMessage={() => "No campaigns found"}
            placeholder="Select a campaign"
          />
          <Button
            className="w-11/12 mb-8 mt-auto"
            onClick={() => createCharacter()}
          >
            Create
          </Button>
        </section>
      </Modal>
    </>
  );
}
