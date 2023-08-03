import {
  addSheet,
  deleteSheetWithId,
  getAllCampaigns,
  updateSheetWithId,
} from "@/app/utils/apiCalls";
import { Sheet, useSheetStore } from "@/app/utils/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiPencil } from "react-icons/gi";
import Select from "react-select";
import { toast } from "react-toastify";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Modal } from "../common/Modal";
interface ListArgs {
  sheets: Sheet[] | undefined;
}

export const List = ({ sheets }: ListArgs) => {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState(false);
  const [showNewSheetModal, setShowNewSheetModal] = React.useState(false);

  const selectedSheet = useSheetStore((state) => state.selectedSheet);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);

  const [options, setOptions] = React.useState<any>([]);
  const [campaign, setCampaign] = React.useState<string>();
  const user = useSheetStore((state) => state.user);

  async function createCharacter() {
    if (characterName && characterName !== "") {
      addSheet({
        characterName: characterName,
        userId: user?.record?.id,
        campaignId: campaign,
      })
        .then((res: any) => {
          toast.success("Created sheet successfully");
          router.push(`/sheets/${res.id}`);
        })
        .catch(() => {
          toast.error("Failed to create sheet");
        });
    }
  }

  const [characterName, setCharacterName] = useState<string>("");

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
  }, [selectedSheet]);

  return (
    <div className="grid grid-cols-5 w-full overflow-x-hidden z-0 overflow-y-scroll h-fit overflow-scroll p-20 gap-10 justify-center">
      {sheets && sheets.length > 0 && (
        <>
          {sheets
            .sort((a: Sheet, b: Sheet) => {
              return Date.parse(b.updated) - Date.parse(a.updated);
            })
            .map((sheet: Sheet, i: number) => (
              <button
                className="border-2 relative transition-all aspect-square filter flex justify-center items-center hover:scale-105 border-light-secondary dark:border-dark-secondary h-full flex-col py-1"
                key={i}
                data-value="view-sheet-button"
                onClick={(e) => {
                  e.preventDefault();
                  let dataValue = (e.target as HTMLElement).getAttribute(
                    "data-value"
                  );
                  if (dataValue === "view-sheet-button") {
                    router.push(`/sheets/${sheet?.id}`);
                  }
                }}
              >
                <Image
                  className="w-36 h-36 object-contain"
                  data-value="view-sheet-button"
                  width={144}
                  height={144}
                  alt={sheet?.data?.race?.name}
                  src={sheet?.data?.race?.picture!}
                />
                <h2 className="uppercase font-bold text-3xl">
                  {sheet?.data?.name}
                </h2>

                <span className="absolute top-0 left-0 m-2 font-extrabold text-5xl">
                  {sheet?.data?.level}
                </span>
                <p>{sheet?.expand?.campaign && sheet?.expand?.campaign.name}</p>
                <button
                  id="edit-sheet-button"
                  data-value="edit-sheet-button"
                  onClick={() => {
                    setSelectedSheet(sheet);
                    setShowModal(true);
                  }}
                  className="absolute top-0 right-0 m-2 font-extrabold bg-light-secondary dark:bg-dark-secondary text-light-primary dark:text-dark-primary text-xl rounded-full flex justify-center items-center w-10 h-10"
                >
                  <GiPencil data-value="edit-sheet-button" />
                </button>
              </button>
            ))}
        </>
      )}
      <button
        className="border-2 transition-all uppercase font-bold text-3xl dark:border-dark-secondary filter flex justify-center items-center hover:scale-105 border-light-secondary h-full aspect-square flex-col py-1"
        data-value="view-sheet-button"
        onClick={() => setShowNewSheetModal(true)}
      >
        Create
      </button>

      <Modal showModal={showNewSheetModal} setShowModal={setShowNewSheetModal}>
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

      <Modal className="p-4" showModal={showModal} setShowModal={setShowModal}>
        <Input
          value={selectedSheet?.data?.name}
          className="w-80"
          placeholder="Character name"
          onChange={(e) => {
            updateSheetWithId(
              selectedSheet?.id,
              { ...selectedSheet?.data, name: e.target.value },
              selectedSheet?.campaign,
              selectedSheet?.user!
            )
              .then((res: any) => {
                toast.success("Updated sheet successfully");
                setSelectedSheet(res);
              })
              .catch(() => {
                toast.error("Failed to update sheet");
              });
          }}
        />

        <Select
          options={options}
          onChange={(campaign: any) => setCampaign(campaign.value)}
          noOptionsMessage={() => "No campaigns found"}
          placeholder="Select a campaign"
        />
        <section className="flex mt-auto w-full justify-end gap-x-4">
          <Button
            onClick={() =>
              updateSheetWithId(
                selectedSheet?.id,
                selectedSheet?.data,
                campaign,
                selectedSheet?.user!
              )
                .then((res: any) => {
                  toast.success("Added sheet to campaign");
                  setSelectedSheet(res);
                })
                .catch(() => {
                  toast.error("Failed to add sheet to campaign");
                })
            }
          >
            Update
          </Button>
          <Button
            className="bg-red-600 border-red-600"
            onClick={() =>
              deleteSheetWithId({
                sheetId: selectedSheet?.id,
                userId: user.record.id,
              })
                .then(() => {
                  toast.success("Removed sheet!");
                })
                .catch((e) => {
                  console.log(e);
                  toast.error("Failed to remove sheet");
                })
            }
          >
            Delete
          </Button>
        </section>
      </Modal>
    </div>
  );
};
