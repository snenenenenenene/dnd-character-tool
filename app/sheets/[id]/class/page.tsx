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

export default function ClassSelection(context: any) {
  const groups = _.groupBy(classes, "expansion");
  const [sheet, setSheet] = useState<any>();

  useEffect(() => {
    getSheetWithId(context.params.id).then((res) => {
      setSheet(res);
    });
  }, []);

  function updateSheet() {
    updateSheetWithId(context.params.id, sheet.data, sheet.campaign, sheet.user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="w-full h-full flex">
      <section className="w-64 text-center border-r-2 border-r-light h-full pr-8 overflow-y-scroll">
        <Image
          src={sheet?.data?.race?.picture}
          alt={sheet?.data?.race?.name}
          className="w-40 h-40 object-contain"
          width={160}
          height={160}
        />
        <h2 className="mx-auto text-xl font-semibold">
          {sheet?.data?.race?.name}
        </h2>
        {Object.entries(groups).map(([expansion, c]: any) => {
          return (
            <div key={Expansion[expansion]}>
              <hr className="my-4" />
              <h3 className="font-bold uppercase py-4">
                {Expansion[expansion]}
              </h3>
              <section className="flex flex-col">
                {c.map((_class: Class) => (
                  <button
                    className="border-b-2 border-light-secondary transition-all filter hover:drop-shadow-lg flex justify-center items-center hover:border-b-light-accent flex-col py-1"
                    key={_class.name}
                    value={_class.name}
                    onClick={() => {
                      if (sheet?.data?.class?.length < 2) {
                        setSheet((sheet: any) => {
                          return {
                            ...sheet,
                            data: {
                              ...sheet?.data,
                              class: [...sheet.data.class, _class],
                            },
                          };
                        });

                        console.log(sheet);
                        updateSheet();
                        // updatesheet?.data({
                        //   ...sheet?.data,
                        //   class: [...sheet?.data!.class, _class],
                        // });
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

      <section className="w-full h-full flex px-8">
        <section className="flex w-full h-full gap-5 pr-4">
          {sheet?.data?.class &&
            sheet?.data?.class?.length > 0 &&
            sheet?.data?.class?.map((c: Class, i: number) => (
              <CharacterForm currClass={c} classIndex={i} key={c.name} />
            ))}
        </section>
      </section>

      <Link
        href={"/sheets/new/classes"}
        className="fixed bottom-32 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
      >
        <GiBroadheadArrow />
      </Link>

      <Link
        href={"/sheets/new"}
        className="fixed bottom-32 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
      >
        <GiBoomerang />
      </Link>
    </div>
  );
}
