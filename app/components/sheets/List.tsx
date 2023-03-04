import { getAllCampaigns, updateSheetWithId } from "@/app/utils/apiCalls";
import { Sheet } from "@/app/utils/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { GiPencil } from "react-icons/gi";
import Select from "react-select";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

interface SheetResponse {
  id: string;
  data: Sheet;
  campaign: string;
  user: string;
}
interface ListArgs {
  sheets: SheetResponse[];
}

export const List = ({ sheets }: ListArgs) => {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState(false);
  const [sheet, setSheet] = React.useState<SheetResponse>();
  const [options, setOptions] = React.useState<any>([]);
  const [campaign, setCampaign] = React.useState<string>();

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
  }, []);

  return (
    <div className="flex flex-col w-full">
      {sheets && sheets.length > 0 ? (
        sheets?.map((sheet, i) => (
          <button
            className="w-full flex justify-between items-center h-10 px-20 py-8 hover:text-light-primary border-b-2 border-light-secondary dark:border-dark-secondary hover:bg-light-secondary hover:dark:text-dark-primary hover:dark:bg-dark-secondary"
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
            <p>{sheet?.data?.name}</p>
            <p>{sheet?.data?.race?.name}</p>
            <p>Level: {sheet?.data?.level}</p>
            <p>{sheet?.campaign ? sheet?.campaign : <>None</>}</p>
            <button
              id="edit-sheet-button"
              data-value="edit-sheet-button"
              onClick={() => {
                setSheet(sheet);
                setShowModal(true);
              }}
              className="bg-light-secondary dark:bg-dark-secondary text-light-primary dark:text-dark-primary text-xl rounded-full flex justify-center items-center w-10 h-10"
            >
              <GiPencil data-value="edit-sheet-button" />
            </button>
          </button>
        ))
      ) : (
        <section className="w-full h-full justify-center items-center uppercase font-bold text-3xl flex py-20 px-10">
          <p>No sheets! Create a sheet and start your adventure!</p>
        </section>
      )}
      {showModal && (
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
              setShowModal(false);
            }
          }}
        >
          <div
            id="modal-foreground"
            data-value="child"
            className="w-1/3 h-1/2 min-w-[500px] flex flex-col justify-center gap-8 items-center bg-light-secondary rounded-md"
          >
            <Input
              value={sheet?.data.name}
              className="w-80"
              onChange={(e) => {
                updateSheetWithId(
                  sheet?.id,
                  { ...sheet?.data, name: e.target.value },
                  sheet?.campaign,
                  sheet?.user!
                )
                  .then((res: any) => {
                    console.log(res);
                    setSheet(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              placeholder="Character name"
            />

            <Select
              options={options}
              onChange={(campaign: any) => setCampaign(campaign.value)}
              noOptionsMessage={() => "No campaigns found"}
              placeholder="Select a campaign"
            />
            <Button
              onClick={() =>
                updateSheetWithId(
                  sheet?.id,
                  sheet?.data,
                  campaign,
                  sheet?.user!
                )
                  .then((res: any) => {
                    console.log(res);
                    setSheet(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              }
            >
              Update
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
