// @ts-ignore: Object is possibly 'null'.
"use client";
import AbilitySidebar from "@/app/components/character/AbilitySidebar";
import { Button } from "@/app/components/common/Button";
import { Modal } from "@/app/components/common/Modal";
import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import { SheetData, useSheetStore } from "@/app/utils/store";
import { classes } from "@/data/classes/classes";
import { ArmorTypes, Class, Expansion, HitDie } from "@/data/classes/types";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StatSidebar } from "../../components/character/StatSidebar";
interface LayoutArgs {
  children: React.ReactNode;
  params: {
    id: string;
  };
}
export default function Page({ children, params }: LayoutArgs) {
  const groups = _.groupBy(classes, "expansion");
  const selectedSheet = useSheetStore((state) => state.selectedSheet);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<Class>();

  useEffect(() => {
    getSheetWithId(params.id).then((res: any) => {
      setSelectedSheet(res);
    });
  }, []);

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-full">
        <section className="w-full h-full flex">
          <div className="w-full h-full flex">
            <section className="w-60 text-center  border-r-2 border-r-light-secondary dark:border-r-dark-secondary h-full overflow-y-scroll">
              <Link
                href={`/sheets/${selectedSheet?.id}/race`}
                className="border-b-2 pt-3 flex justify-center transition-all duration-200 border-light-secondary dark:border-dark-secondary pb-5 hover:bg-light-secondary hover:dark:bg-dark-secondary hover:text-light-primary hover:dark:text-dark-primary"
              >
                {selectedSheet?.data?.race?.picture && (
                  <Image
                    src={selectedSheet.data?.race.picture}
                    alt={selectedSheet.data?.race.name}
                    className="w-40 h-40 object-contain"
                    width={160}
                    height={160}
                  />
                )}
                {/* <h2 className="mx-auto text-xl font-semibold ">
            {selectedSheet?.data?.race?.name}
          </h2> */}
              </Link>
              {Object.entries(groups).map(([expansion, c]: any) => {
                return (
                  <div key={Expansion[expansion]}>
                    <h3 className="font-bold uppercase py-4">
                      {Expansion[expansion]}
                    </h3>
                    <section className="flex flex-col w-full">
                      {c.map((_class: Class) => (
                        <button
                          className="w-full transition-all filter hover:drop-shadow-lg flex justify-center items-center hover:dark:bg-dark-secondary hover:dark:text-dark-primary hover:bg-light-secondary hover:text-light-primary flex-col py-2"
                          key={_class.name}
                          value={_class.name}
                          onClick={() => {
                            setSelectedClass(_class);
                            setShowModal(true);
                          }}
                        >
                          <h4>{_class.name}</h4>
                        </button>
                      ))}
                    </section>
                  </div>
                );
              })}
            </section>

            <div className="h-full w-full flex flex-col p-4 overflow-hidden">
              <span className="uppercase font-bold pb-4 flex">
                <h2 className="text-4xl">{selectedSheet?.data?.name}</h2>
                <p className="text-2xl font-medium my-auto pl-4">
                  {selectedSheet?.data?.class &&
                    selectedSheet?.data?.class[0]?.name}
                  &nbsp;
                  {selectedSheet?.data?.race && selectedSheet?.data?.race.name}
                </p>
              </span>
              <section className="h-20 w-full flex gap-x-4 overflow-scroll">
                <Link
                  href={`/sheets/${params.id}/race`}
                  className="bg-light-accent h-14 w-40 flex justify-center items-center text-light-primary"
                >
                  Race
                </Link>
                <Link
                  href={`/sheets/${params.id}/class`}
                  className="bg-orange-600 h-14 w-40 flex justify-center items-center text-light-primary"
                >
                  Class
                </Link>
                <Link
                  href={`/sheets/${params.id}/gear`}
                  className="bg-green-600 h-14 w-40 flex justify-center items-center text-light-primary"
                >
                  Gear
                </Link>

                <Link
                  href={`/sheets/${params.id}/personality`}
                  className="bg-red-600 h-14 w-40 flex justify-center items-center text-light-primary"
                >
                  Personality
                </Link>
                <Link
                  href={`/sheets/${params.id}/spells`}
                  className="bg-blue-600 h-14 w-40 flex justify-center items-center text-light-primary"
                >
                  Spells
                </Link>
                <Link
                  href={`/sheets/${params.id}/wildshapes`}
                  className="bg-orange-600 h-14 w-40 flex justify-center items-center text-light-primary"
                >
                  Shapes
                </Link>
              </section>

              <section className="w-full h-full flex px-8 pt-5 overflow-hidden">
                {children}
              </section>
            </div>

            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              className="overflow-y-scroll "
            >
              <section className="w-full overflow-y-scroll h-fit flex flex-col p-4">
                <section className="flex w-full h-full overflow-y-scroll">
                  <span className="w-3/4">
                    <h2 className="text-6xl  uppercase font-bold">
                      {selectedClass?.name}
                    </h2>
                    {/* {selectedClass?.hitDie?.map((hitDie: any) => ( */}
                    <p className="uppercase font-semibold">
                      {HitDie[selectedClass?.hitDie!]}
                    </p>
                    {/* ))} */}
                    <span className="flex gap-x-4">
                      {selectedClass?.proficiencies?.armor!.map((armour) => (
                        <p className="uppercase font-semibold" key={armour}>
                          {ArmorTypes[armour]}
                        </p>
                      ))}
                    </span>
                    <section className="flex flex-col text-xs gap-y-2 text-justify w-10/12">
                      {selectedClass?.features?.map((f) => (
                        <span className="flex flex-col" key={f.name}>
                          <p className="font-semibold uppercase">{f.name}</p>
                          <p>{f.description}</p>
                        </span>
                      ))}
                    </section>
                  </span>
                  <picture className="w-1/4 flex relative">
                    {selectedClass?.image && (
                      <Image
                        className="object-contain"
                        src={selectedClass?.image}
                        alt={selectedClass?.name}
                        fill
                      />
                    )}
                  </picture>
                </section>
                <Button
                  className="w-full my-1 mx-auto"
                  onClick={() => {
                    let total = 0;
                    selectedSheet?.data?.class?.forEach((c: Class) => {
                      total += c.level;
                    });

                    if (selectedSheet?.data?.class?.length! < 2) {
                      if (total >= selectedSheet?.data?.level!)
                        return toast.error(
                          "You have reached the maximum level for your character."
                        );
                      updateSheetWithId(
                        params.id,
                        {
                          ...selectedSheet?.data,
                          // calculate HP based on the halve of the hitdie + 1  and add con modifier times the level
                          // get the hitdie value from the enum, this wil retrieve a d(number) remove the d and parse it to a number
                          hitPoints: {
                            ...selectedSheet?.data?.hitPoints,
                            max:
                              (selectedSheet?.data?.level +
                                selectedSheet?.data?.stats.constitution) *
                              Math.floor(
                                Number(
                                  HitDie[selectedClass?.hitDie!].replace(
                                    "d",
                                    ""
                                  )
                                ) /
                                  2 +
                                  1
                              ),
                          },
                          class: [...selectedSheet.data!.class, selectedClass],
                          skills: {
                            // eslint-disable-next-line no-unsafe-optional-chaining
                            ...selectedSheet?.data?.skills,
                            acrobatics: 0,
                            "animal handling": 0,
                            arcana: 0,
                            athletics: 0,
                            deception: 0,
                            history: 0,
                            insight: 0,
                            intimidation: 0,
                            investigation: 0,
                            medicine: 0,
                            nature: 0,
                            perception: 0,
                            performance: 0,
                            persuasion: 0,
                            religion: 0,
                            "sleight of hand": 0,
                            stealth: 0,
                            survival: 0,
                          },
                        } as SheetData,
                        selectedSheet?.campaign,
                        selectedSheet?.user!
                      )
                        .then((res: any) => {
                          toast.success(`${selectedClass?.name} added!`);
                          setSelectedSheet(res);
                          setShowModal(false);
                        })
                        .catch((e) => {
                          toast.error(e.message);
                        });
                    }
                  }}
                >
                  Add Class
                </Button>
              </section>
            </Modal>
          </div>
          <AbilitySidebar sheetId={params?.id} />
        </section>
      </div>
      <StatSidebar sheetId={params?.id} />
    </div>
  );
}
