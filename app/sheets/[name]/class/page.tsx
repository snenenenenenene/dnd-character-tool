"use client";

import React from "react";
import _ from "lodash";
import Link from "next/link";
import { GiBoomerang, GiBroadheadArrow } from "react-icons/gi";
import { CharacterForm } from "@/app/components/character/CharacterForm";
import { classes } from "@/data/classes/classes";
import { Sheet, useSheetStore } from "@/app/utils/store";
import { Class, Expansion } from "@/data/classes/types";

export default function ClassSelection() {
  const groups = _.groupBy(classes, "expansion");
  const selectedSheet = useSheetStore((state) => state.selectedSheet);
  const updateSelectedSheet = useSheetStore(
    (state) => state.updateSelectedSheet
  );

  return (
    <div className="w-full h-full flex">
      <section className="w-64 text-center border-r-2 border-r-light h-full pr-8 overflow-y-scroll">
        <img
          src={selectedSheet.race.picture}
          className="w-40 h-40 object-contain"
        />
        <h2 className="mx-auto text-xl font-semibold">
          {selectedSheet.race.name}
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
                      if (selectedSheet!.class.length < 2) {
                        updateSelectedSheet({
                          ...selectedSheet,
                          class: [...selectedSheet!.class, _class],
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

      <section className="w-full h-full flex px-8">
        <section className="flex w-full h-full gap-5 pr-4">
          {selectedSheet?.class &&
            selectedSheet?.class?.length > 0 &&
            selectedSheet?.class?.map((c: Class, i: number) => (
              <CharacterForm currClass={c} classIndex={i} key={c.name} />
            ))}
        </section>
      </section>

      <Link
        href={"/sheets/new/classes"}
        className="fixed bottom-20 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
      >
        <GiBroadheadArrow />
      </Link>

      <Link
        href={"/sheets/new"}
        className="fixed bottom-20 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
      >
        <GiBoomerang />
      </Link>
    </div>
  );
}
