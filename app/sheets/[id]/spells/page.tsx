"use client";
import { Button } from "@/app/components/common/Button";
import { Modal } from "@/app/components/common/Modal";
import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import { Sheet, useSheetStore } from "@/app/utils/store";
import { Spell, spells } from "@/data/spells/spellts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Spells(context: any) {
  const selectedSheet: Sheet = useSheetStore((state) => state.selectedSheet);
  const user = useSheetStore((state) => state.user);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);
  const [showModal, setShowModal] = useState(false);
  const [selectedSpell, setSelectedSpell] = useState<any>();
  const selectedSheetSpellInfo =
    (selectedSheet?.data?.class &&
      selectedSheet?.data?.class[0]?.levelUpDetails
        ?.filter(
          (levelUp: any) => levelUp.level <= selectedSheet?.data?.class[0].level
        )
        ?.slice(-1)[0]) ||
    undefined;

  useEffect(() => {
    getSheetWithId(context.params.id).then((res: any) => {
      setSelectedSheet(res);
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col px-10">
      <div className="w-full h-40 border-2 border-light-secondary">
        <h1 className="text-4xl font-bold uppercase text-center">Info</h1>
        <section className="flex w-full h-full  justify-between px-10">
          <p className="text-light-secondary text-xl font-bold">
            Proficiency Bonus:&nbsp;
            {selectedSheetSpellInfo?.proficiencyBonus || 0}
          </p>
          <p className="text-light-secondary text-xl font-bold">
            Cantrips Known:&nbsp;
            {selectedSheetSpellInfo?.cantripsKnown || 0}
          </p>
          <p className="text-light-secondary text-xl font-bold">
            Spells Known:&nbsp;
            {selectedSheetSpellInfo?.spellsKnown || 0}
          </p>
          <p className="text-light-secondary text-xl font-bold">
            Spellslots:&nbsp;
            {selectedSheetSpellInfo?.spellSlots || 0}
          </p>
          <p className="text-light-secondary text-xl font-bold">
            Spellslot Level:&nbsp;
            {selectedSheetSpellInfo?.spellSlotLevel || 0}
          </p>
          <p className="text-light-secondary text-xl font-bold">
            Invocations Known:&nbsp;
            {selectedSheetSpellInfo?.invocationsKnown || 0}
          </p>
        </section>
      </div>
      <div className="grid grid-cols-3 w-full h-full gap-4 pt-4 py-10">
        <div className="border-2 border-light-secondary w-full h-full p-4 flex flex-col">
          <h2 className="text-3xl font-bold uppercase">Cantrips</h2>
          <section>
            {selectedSheet?.data?.spells?.map((spell: Spell) => {
              return (
                <section key={spell.name}>
                  <span className="flex justify-between">
                    <h3 className="text-2xl font-semibold">{spell.name}</h3>
                    <button
                      onClick={() => {
                        const newSheet = { ...selectedSheet };
                        newSheet.data.spells = newSheet.data.spells.filter(
                          (s: Spell) => s.name !== spell.name
                        );
                        updateSheetWithId(
                          selectedSheet.id,
                          newSheet,
                          selectedSheet.campaign,
                          user.id
                        )
                          .then((res: any) => {
                            setSelectedSheet(res);
                          })
                          .catch((err) => {
                            toast.error(err.message);
                          });
                      }}
                      className="cursor-pointer p-2"
                    >
                      x
                    </button>
                  </span>
                  <p>{spell.description}</p>
                </section>
              );
            })}
          </section>
          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer border-2 border-light-secondary p-2"
          >
            +
          </button>
        </div>
        <div className="border-2 border-light-secondary w-full h-full p-4 flex flex-col">
          <h2 className="text-3xl font-bold uppercase">0</h2>
        </div>
        <div className="border-2 border-light-secondary w-full h-full p-4 flex flex-col">
          <h2 className="text-3xl font-bold uppercase">1</h2>
        </div>
        <div className="border-2 border-light-secondary w-full h-full p-4 flex flex-col">
          <h2 className="text-3xl font-bold uppercase">2</h2>
        </div>
        <Modal setShowModal={setShowModal} showModal={showModal}>
          <section className="flex w-full h-full">
            <section className="w-1/4 border-light-secondary border-r-2 flex flex-col ">
              <h2 className="text-3xl font-bold uppercase p-4">Cantrips</h2>
              <div className="overflow-y-scroll">
                {spells?.map((spell) => (
                  <button
                    onClick={() => setSelectedSpell(spell)}
                    key={spell.name}
                    className="flex justify-between px-4 py-1 w-full hover:bg-light-secondary hover:text-light-primary"
                  >
                    <span className="flex">
                      <p>{spell.name}</p>
                    </span>
                  </button>
                ))}
              </div>
            </section>
            <div className="w-3/4 h-full flex flex-col">
              {selectedSpell && (
                <section className="w-full h-full">
                  <h2 className="text-3xl font-bold uppercase p-4">
                    {selectedSpell.name}
                  </h2>
                  <p className="p-4">{selectedSpell.description}</p>
                </section>
              )}
              <Button
                onClick={() => {
                  if (selectedSheetSpellInfo?.cantripsKnown! >= 0)
                    updateSheetWithId(
                      selectedSheet?.id,
                      selectedSheet.data.spells
                        ? {
                            ...selectedSheet?.data,
                            spells: [
                              ...selectedSheet.data.spells,
                              selectedSpell,
                            ],
                          }
                        : {
                            ...selectedSheet?.data,
                            spells: [selectedSpell],
                          },
                      selectedSheet?.campaign,
                      user.id
                    )
                      .then((res: any) => {
                        setSelectedSheet(res);
                      })
                      .catch((err) => {
                        toast.error(err.message);
                      });
                  setShowModal(false);
                }}
                className="mt-auto m-4"
              >
                Learn Spell
              </Button>
            </div>
          </section>
        </Modal>
      </div>
    </div>
  );
}
