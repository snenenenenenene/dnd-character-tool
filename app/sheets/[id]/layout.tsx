"use client";
import AbilitySidebar from "@/app/components/character/AbilitySidebar";
import { Button } from "@/app/components/common/Button";
import { Modal } from "@/app/components/common/Modal";
import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import { Sheet } from "@/app/utils/store";
import { classes } from "@/data/classes/classes";
import { Class, Expansion } from "@/data/classes/types";
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
  const [sheet, setSheet]: any = useState<Sheet>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<Class>();

  useEffect(() => {
    getSheetWithId(params.id).then((res: any) => {
      setSheet(res);
    });
  }, []);

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-full">
        {/* <div className="h-10 text-light-primary justify-center items-center flex w-full border-b-2 border-light-secondary"> */}
        {/* Lol */}
        {/* </div> */}
        <section className="w-full h-full flex">
          <div className="w-full h-full flex">
            <section className="w-60 text-center  border-r-2 border-r-light-secondary dark:border-r-dark-secondary h-full overflow-y-scroll">
              <Link
                href={`/sheets/${sheet?.id}/race`}
                className="border-b-2 pt-3 border-light-secondary dark:border-dark-secondary pb-5 hover:bg-light-secondary hover:dark:bg-dark-secondary hover:text-light-primary hover:dark:text-dark-primary"
              >
                {sheet?.data?.race.picture && (
                  <Image
                    src={sheet.data.race.picture}
                    alt={sheet.data.race.name}
                    className="w-40 h-40 object-contain"
                    width={160}
                    height={160}
                  />
                )}
                {/* <h2 className="mx-auto text-xl font-semibold ">
            {sheet?.data?.race?.name}
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

            <div className="h-full w-full flex flex-col p-4">
              <span className="uppercase font-bold pb-4 flex">
                <h2 className="text-4xl">{sheet?.data?.name}</h2>
                <p className="text-2xl font-medium my-auto pl-4">
                  {sheet?.data?.class && sheet?.data?.class[0].name}
                  &nbsp;
                  {sheet?.data.race && sheet?.data.race.name}
                </p>
              </span>
              <section className="h-40 flex gap-x-4">
                <Link
                  href={`/sheets/${params.id}/race`}
                  className="bg-light-accent h-14 w-40 flex justify-center items-center text-light-primary"
                >
                  Race
                </Link>
                <Link
                  href={`/sheets/${params.id}`}
                  className="bg-orange-600 h-14 w-40 flex justify-center items-center text-light-primary"
                >
                  Class
                </Link>
              </section>

              <section className="w-full h-full flex px-8 pt-5">
                {children}
              </section>
            </div>

            <Modal showModal={showModal} setShowModal={setShowModal}>
              <section className="w-full h-full flex flex-col items-center">
                <h2 className="text-2xl font-bold">{selectedClass?.name}</h2>
                {selectedClass?.image && (
                  <Image
                    src={selectedClass?.image}
                    alt={selectedClass?.name}
                    className="w-40 h-40 object-contain"
                    width={160}
                    height={160}
                  />
                )}
                <p>{selectedClass?.hitDie}</p>
                <p>{selectedClass?.proficiencies?.armor}</p>
                <Button
                  className="w-11/12 mb-5 mt-auto"
                  onClick={() => {
                    let total = 0;
                    sheet?.data?.class?.forEach((c: any) => {
                      total += c.level;
                    });

                    if (sheet?.data?.class?.length! < 2) {
                      if (total >= sheet?.data?.level!)
                        return toast.error(
                          "You have reached the maximum level for your character."
                        );
                      updateSheetWithId(
                        params.id,
                        {
                          ...sheet?.data,
                          class: [...sheet.data.class, selectedClass],
                          skills: {
                            // eslint-disable-next-line no-unsafe-optional-chaining
                            ...sheet?.data?.skills,
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
                        },
                        sheet?.campaign,
                        sheet?.user!
                      )
                        .then((res: any) => {
                          toast.success(`${selectedClass?.name} added!`);
                          setSheet(res);
                          setShowModal(false);
                        })
                        .catch(() => {
                          toast.error("Something went wrong.");
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
