"use client";

import { Button } from "@/app/components/common/Button";
import { Modal } from "@/app/components/common/Modal";
import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import { Sheet, useSheetStore } from "@/app/utils/store";
import { gear, Gear } from "@/data/gear/gear";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function GearPage(context: any) {
  const selectedSheet: Sheet = useSheetStore((state) => state.selectedSheet);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedGear, setSelectedGear] = useState<any>([]);
  const [selectedGearType, setSelectedGearType] = useState<string>("Armour");
  const user = useSheetStore((state) => state.user);
  const gearGroups = _.groupBy(gear, "type");

  useEffect(() => {
    getSheetWithId(context.params.id).then((res: any) => {
      setSelectedSheet(res);
    });
  }, []);

  const GearType = ({ gearType }: { gearType: string }) => {
    return (
      <div className="border-2 border-light-secondary p-4 flex flex-col w-full aspect-square h-max">
        <h2 className="text-3xl uppercase font-bold">{gearType}</h2>
        <div className="flex flex-col h-full">
          {selectedSheet?.data.gear
            ?.filter((e) => e.type === gearType)
            // @ts-ignore
            .map((e: Gear) => (
              <div key={e.name} className="flex justify-between">
                <p>{e.name}</p>
                {/* <p>{e.damage}</p> */}
              </div>
            ))}
          <Button
            onClick={() => {
              setSelectedGearType(gearType);
              setShowModal(true);
            }}
            className="mt-auto"
          >
            +
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-10 flex w-full h-full">
      <div className="grid grid-cols-3 gap-8 px-10 w-full h-full overflow-y-scroll">
        {/* <div className="border-2 border-light-secondary p-4 flex flex-col w-full aspect-square h-max">
          <h2 className="text-3xl uppercase font-bold">Armour & Shields</h2>
          <div className="flex flex-col h-full">
            {selectedSheet?.data.gear
              ?.filter((e) => e.type === "Armour")
              // @ts-ignore
              .map((e: Armour) => (
                <div key={e.name} className="flex justify-between">
                  <p>{e.name}</p>
                  <p>{e.armourClass}</p>
                </div>
              ))}
            <Button
              onClick={() => {
                setSelectedGearType("Armour");
                setShowModal(true);
              }}
              className="mt-auto"
            >
              +
            </Button>
          </div>
        </div> */}

        {
          // split up the gear into different components by type (weapons, armour, etc) then map over them
          Object.entries(gearGroups).map(([type, g]: any) => {
            return <GearType gearType={type} key={type} />;
          })
        }
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="flex w-full h-full">
          <div className="flex flex-col w-1/4 border-r-2 border-light-secondary">
            <h2 className="text-3xl uppercase p-4 font-bold">
              {selectedGearType}
            </h2>
            <div className="flex flex-col h-full w-full overflow-y-scroll">
              {gear
                .filter((e) => e.type === selectedGearType)
                .map((e: Gear) => (
                  <button
                    onClick={() => setSelectedGear(e)}
                    key={e.name}
                    className="flex px-4 text-lg py-1 justify-between"
                  >
                    <p>{e.name}</p>
                    {/* <p>{e.armourClass} AC</p> */}
                  </button>
                ))}
            </div>
          </div>
          <div className="flex flex-col w-3/4">
            <h2 className="text-3xl uppercase p-4 font-bold">
              {selectedGear.name}
            </h2>
            <div className="flex flex-col p-4 h-full overflow-y-scroll">
              <div className="flex justify-between">
                <p>Cost</p>
                <p>{selectedGear.cost}</p>
              </div>
              <div className="flex justify-between">
                <p>Weight</p>
                <p>{selectedGear.weight}</p>
              </div>
              {/* <div className="flex justify-between">
                <p>Armour Class</p>
                <p>{selectedGear.armourClass}</p>
              </div> */}
            </div>
            <Button
              onClick={() => {
                updateSheetWithId(
                  context.params.id,
                  {
                    ...selectedSheet.data,
                    gear: !selectedGear.gear
                      ? [...selectedSheet.data.gear, selectedGear]
                      : [selectedGear],
                  },
                  selectedSheet.campaign,
                  user.id
                )
                  .then((res: any) => {
                    toast.success(
                      `Successfully added ${selectedGear.name} to your sheet`
                    );
                    setSelectedSheet(res);
                    setShowModal(false);
                  })
                  .catch(() => {
                    toast.error(
                      `Failed to add ${selectedGear.name} to your sheet}`
                    );
                  });
              }}
              className="m-4"
            >
              Pick Gear
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
