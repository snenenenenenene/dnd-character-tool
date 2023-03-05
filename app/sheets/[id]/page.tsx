"use client";

import React, { useEffect, useState } from "react";
import _ from "lodash";
import Link from "next/link";
import { GiBoomerang, GiBroadheadArrow } from "react-icons/gi";
import { ClassEditor } from "@/app/components/character/ClassEditor";
import { classes } from "@/data/classes/classes";
import { Class, Expansion } from "@/data/classes/types";
import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import Image from "next/image";
import { toast } from "react-toastify";
import { Sheet } from "@/app/utils/store";
import { Modal } from "@/app/components/common/Modal";
import { Button } from "@/app/components/common/Button";

export default function ClassSelection(context: any) {
  const groups = _.groupBy(classes, "expansion");
  const [sheet, setSheet] = useState<Sheet>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<Class>();

  useEffect(() => {
    getSheetWithId(context.params.id).then((res: any) => {
      setSheet(res);
    });
  }, []);

  return (
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
          <h2 className="mx-auto text-xl font-semibold ">
            {sheet?.data?.race?.name}
          </h2>
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

      <section className="w-full h-full flex px-8 pt-5">
        <section className="flex flex-col w-1/2 h-full gap-5 pr-4">
          {sheet?.data?.class &&
            sheet?.data?.class?.length > 0 &&
            sheet?.data?.class?.map((c: Class, i: number) => (
              <ClassEditor
                setSheet={setSheet}
                sheetId={context.params.id}
                sheet={sheet}
                currClass={c}
                classIndex={i}
                key={c.name}
              />
            ))}
        </section>
        <section className="flex flex-col w-1/2 h-full">
          {sheet?.data?.class && sheet?.data?.class?.length > 0 && (
            <>
              <p>Max HP</p>
              <p>{sheet?.data.hitPoints.max}</p>
            </>
          )}
        </section>
      </section>

      <Link
        href={`/sheets/${context.params.id}/classes`}
        className="fixed bottom-32 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
      >
        <GiBroadheadArrow />
      </Link>

      <Link
        href={`/sheets/${context.params.id}`}
        className="fixed bottom-32 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
      >
        <GiBoomerang />
      </Link>
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
                  context.params.id,
                  {
                    ...sheet?.data,
                    class: [...sheet?.data?.class!, selectedClass],
                  },
                  sheet?.campaign,
                  sheet?.user!
                )
                  .then((res: any) => {
                    console.log(res);
                    setSheet(res);
                    setShowModal(false);
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error("Something went wrong.");
                  });
              }
            }}
          >
            Pick Character
          </Button>
        </section>
      </Modal>
    </div>
  );
}
