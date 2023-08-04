"use client";
import { Button } from "@/app/components/common/Button";
import { Modal } from "@/app/components/common/Modal";
import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import { Sheet, useSheetStore } from "@/app/utils/store";
import { Class } from "@/data/classes/types";
import { Spell, spells } from "@/data/spells/spellts";
import { useEffect, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Spells(context: any) {
  const selectedSheet: Sheet = useSheetStore((state) => state.selectedSheet);
  const user = useSheetStore((state) => state.user);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);
  const [showCantripModal, setShowCantripModal] = useState(false);
  const [showSpellModal, setShowSpellModal] = useState(false);
  const [selectedSpell, setSelectedSpell] = useState<any>();
  const [selectedSheetSpellInfo, setSelectedSheetSpellInfo] = useState<any>();

  useEffect(() => {
    getSheetWithId(context.params.id).then((res: any) => {
      setSelectedSheet(res);
    });
  }, []);

  useEffect(() => {
    if (selectedSheet) {
      const spellInfo = {
        proficiencyBonus: 0,
        cantripsKnown: 0,
        spellsKnown: 0,
        spellSlots: 0,
        spellSlotLevel: 0,
        invocationsKnown: 0,
      };

      selectedSheet.data?.class?.forEach((c: Class) => {
        const level = c.levelUpDetails?.find((l) => l.level === c.level);
        console.log(c.levelUpDetails);
        console.log(level);
        console.log(c.level);

        spellInfo.proficiencyBonus += level?.proficiencyBonus || 0;
        spellInfo.cantripsKnown += level?.cantripsKnown || 0;
        spellInfo.spellsKnown += level?.spellsKnown || 0;
        spellInfo.spellSlots += level?.spellSlots || 0;
        spellInfo.spellSlotLevel += level?.spellSlotLevel || 0;
        spellInfo.invocationsKnown += level?.invocationsKnown || 0;
      });

      setSelectedSheetSpellInfo(spellInfo);
    }
  }, [selectedSheet]);

  return (
    <div className="w-full h-full flex flex-col px-10">
      <div className="w-full h-40 border-2 border-light-secondary flex justify-between items-center px-10">
        <p className="text-light-secondary text-xl font-bold">
          Proficiency Bonus:&nbsp;
          {selectedSheetSpellInfo?.proficiencyBonus || 0}
        </p>
        <p className="text-light-secondary text-xl font-bold">
          Cantrip Slots:&nbsp;
          {selectedSheet.data.spells.filter((s) => s.level === 0).length} /
          {selectedSheetSpellInfo?.cantripsKnown || 0}
        </p>
        <p className="text-light-secondary text-xl font-bold">
          Spells Known:&nbsp;
          {selectedSheet.data.spells.filter((s) => s.level > 0).length}/
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
      </div>
      <div className="grid grid-cols-3 w-full gap-8 pt-4 py-10 overflow-y-scroll">
        <div className="border-2 border-light-secondary w-full h-max aspect-square p-4 flex flex-col overflow-y-scroll">
          <h2 className="text-3xl font-bold uppercase">Cantrips</h2>
          <section>
            {selectedSheet?.data?.spells
              ?.filter((s) => s.level === 0)
              .map((spell: Spell) => {
                return (
                  <section key={spell.name}>
                    <span className="flex justify-between">
                      <h3 className="text-2xl font-semibold">{spell.name}</h3>
                      <button
                        onClick={() => {
                          updateSheetWithId(
                            selectedSheet.id,

                            {
                              ...selectedSheet.data,
                              spells: selectedSheet?.data?.spells.filter(
                                (s: Spell) => s.name !== spell.name
                              ),
                            },
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
            onClick={() => setShowCantripModal(true)}
            className="cursor-pointer border-2 border-light-secondary bg-light-secondary text-light-primary text-3xl mt-auto p-2 flex justify-center items-center"
          >
            {selectedSheetSpellInfo?.cantripsKnown !==
            selectedSheet.data.spells.filter((s) => s.level === 0).length ? (
              <p>+</p>
            ) : (
              <FiInfo />
            )}
          </button>
        </div>
        <div className="border-2 border-light-secondary w-full h-max aspect-square p-4 flex flex-col overflow-y-scroll">
          <h2 className="text-3xl font-bold uppercase">1</h2>
          <section>
            {selectedSheet?.data?.spells
              ?.filter((s) => s.level === 1)
              .map((spell: Spell) => {
                return (
                  <section key={spell.name}>
                    <span className="flex justify-between">
                      <h3 className="text-2xl font-semibold">{spell.name}</h3>
                      <button
                        onClick={() => {
                          updateSheetWithId(
                            selectedSheet.id,

                            {
                              ...selectedSheet.data,
                              spells: selectedSheet?.data?.spells.filter(
                                (s: Spell) => s.name !== spell.name
                              ),
                            },
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
            onClick={() => setShowSpellModal(true)}
            className="cursor-pointer border-2 border-light-secondary bg-light-secondary text-light-primary text-3xl mt-auto p-2 flex justify-center items-center"
          >
            {selectedSheetSpellInfo?.spellsKnown !==
            selectedSheet.data.spells.filter((s) => s.level > 0).length ? (
              <p>+</p>
            ) : (
              <FiInfo />
            )}
          </button>
        </div>
        <div className="border-2 border-light-secondary w-full h-max aspect-square p-4 flex flex-col overflow-y-scroll">
          <h2 className="text-3xl font-bold uppercase">2</h2>
        </div>
        <div className="border-2 border-light-secondary w-full h-max aspect-square p-4 flex flex-col overflow-y-scroll">
          <h2 className="text-3xl font-bold uppercase">3</h2>
        </div>
      </div>
      <CantripModalContent
        showModal={showCantripModal}
        setShowModal={setShowCantripModal}
        setSelectedSpell={setSelectedSpell}
        selectedSpell={selectedSpell}
        selectedSheet={selectedSheet}
        setSelectedSheet={setSelectedSheet}
        selectedSheetSpellInfo={selectedSheetSpellInfo}
        user={user}
      />
      <SpellModalContent
        showModal={showSpellModal}
        setShowModal={setShowSpellModal}
        setSelectedSpell={setSelectedSpell}
        selectedSpell={selectedSpell}
        selectedSheet={selectedSheet}
        setSelectedSheet={setSelectedSheet}
        selectedSheetSpellInfo={selectedSheetSpellInfo}
        user={user}
      />
    </div>
  );
}

const SpellModalContent = ({
  showModal,
  setShowModal,
  setSelectedSpell,
  selectedSpell,
  selectedSheet,
  setSelectedSheet,
  selectedSheetSpellInfo,
  user,
}: {
  showModal: boolean;
  setShowModal: any;
  setSelectedSpell: any;
  selectedSpell: Spell;
  selectedSheet: Sheet;
  setSelectedSheet: any;
  selectedSheetSpellInfo: any;
  user: any;
}) => {
  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <section className="flex w-full h-full">
        <section className="w-1/4 border-light-secondary border-r-2 flex flex-col ">
          <h2 className="text-3xl font-bold uppercase p-4">Spells</h2>
          <div className="overflow-y-scroll">
            {spells
              ?.filter((s) => s.level === 1)
              .map((spell) => (
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
              if (
                selectedSheet.data.spells.filter((s) => s.level > 0).length ===
                selectedSheetSpellInfo?.spellsKnown
              )
                return toast.error(
                  "You have reached the maximum amount of spells known"
                );
              if (
                selectedSheet?.data.spells?.find(
                  (s) => s.name === selectedSpell.name
                )
              )
                return toast.error(
                  `You already know this ${selectedSpell?.name}`
                );

              updateSheetWithId(
                selectedSheet?.id,
                selectedSheet.data.spells
                  ? {
                      ...selectedSheet?.data,
                      spells: [...selectedSheet.data.spells, selectedSpell],
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
  );
};

const CantripModalContent = ({
  showModal,
  setShowModal,
  setSelectedSpell,
  selectedSpell,
  selectedSheet,
  setSelectedSheet,
  selectedSheetSpellInfo,
  user,
}: {
  showModal: boolean;
  setShowModal: any;
  setSelectedSpell: any;
  selectedSpell: Spell;
  selectedSheet: Sheet;
  setSelectedSheet: any;
  selectedSheetSpellInfo: any;
  user: any;
}) => {
  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <section className="flex w-full h-full">
        <section className="w-1/4 border-light-secondary border-r-2 flex flex-col ">
          <h2 className="text-3xl font-bold uppercase p-4">Cantrips</h2>
          <div className="overflow-y-scroll">
            {spells
              ?.filter((s) => s.level === 0)
              .map((spell) => (
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
              if (
                selectedSheetSpellInfo?.cantripsKnown! ===
                selectedSheet.data.spells.filter((s) => s.level === 0).length
              )
                return toast.error(
                  "You have reached the maximum amount of cantrips known"
                );
              if (
                selectedSheet?.data.spells?.find(
                  (s) => s.name === selectedSpell.name
                )
              )
                return toast.error("You already know this spell");

              updateSheetWithId(
                selectedSheet?.id,
                selectedSheet.data.spells
                  ? {
                      ...selectedSheet?.data,
                      spells: [...selectedSheet.data.spells, selectedSpell],
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
  );
};
