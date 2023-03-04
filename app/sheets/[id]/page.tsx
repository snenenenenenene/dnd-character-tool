"use client";

import React, { useEffect, useState } from "react";
import _ from "lodash";
import Link from "next/link";
import { GiBoomerang, GiBroadheadArrow } from "react-icons/gi";
import { CharacterForm } from "@/app/components/character/CharacterForm";
import { classes } from "@/data/classes/classes";
import { Class, Expansion } from "@/data/classes/types";
import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ClassSelection(context: any) {
  const groups = _.groupBy(classes, "expansion");
  const [sheet, setSheet] = useState<any>();

  useEffect(() => {
    getSheetWithId(context.params.id).then((res) => {
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
          <Image
            src={sheet?.data?.race?.picture}
            alt={sheet?.data?.race?.name}
            className="w-40 h-40 object-contain"
            width={160}
            height={160}
          />
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
                      //accumulate all levels of all classes
                      let total = 0;
                      sheet?.data?.class?.forEach((c: any) => {
                        total += c.level;
                      });

                      if (sheet?.data?.class?.length < 2) {
                        if (total >= sheet?.data?.level)
                          return toast.error(
                            "You have reached the maximum level for your character."
                          );
                        updateSheetWithId(
                          context.params.id,
                          {
                            ...sheet?.data,
                            class: [...sheet.data.class, _class],
                          },
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
                      }
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
        <section className="flex w-full h-full gap-5 pr-4">
          {sheet?.data?.class &&
            sheet?.data?.class?.length > 0 &&
            sheet?.data?.class?.map((c: Class, i: number) => (
              <CharacterForm
                setSheet={setSheet}
                sheetId={context.params.id}
                sheet={sheet}
                currClass={c}
                classIndex={i}
                key={c.name}
              />
            ))}
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
    </div>
  );
}
