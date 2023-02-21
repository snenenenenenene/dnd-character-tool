"use client";

import { Sheet, useSheetStore } from "@/app/utils/store";
import { races } from "@/data/races/races";
import { Race } from "@/data/races/types";
import _ from "lodash";

import Link from "next/link";
import React from "react";
import { GiBoomerang, GiBroadheadArrow } from "react-icons/gi";

export default function Sheets() {
  const selectedSheet: Sheet = useSheetStore((state) => state.selectedSheet);
  const updateSelectedSheet = useSheetStore(
    (state) => state.updateSelectedSheet
  );

  const groups = _.groupBy(races, "expansion");

  return (
    <div className="w-full relative h-full flex flex-col">
      <h1 className="text-xl font-semibold">Pick your race</h1>

      <section className="flex flex-col">
        {Object.entries(groups).map(([expansion, races]) => {
          return (
            <>
              <hr className="my-4" />
              <h3 className="font-bold uppercase py-4">{expansion}</h3>
              <section className="grid gap-4 grid-cols-3 mx-auto">
                {races.map((race: Race) => (
                  <button
                    className={`${
                      selectedSheet?.race?.name === race.name
                        ? "border-light-accent shadow-lg"
                        : "border-light-secondary"
                    }  border-2  transition-all filter hover:drop-shadow-lg flex justify-center items-center hover:border-light-primary h-48 w-60 flex-col py-1`}
                    key={race.name}
                    value={race.name}
                    onClick={() => {
                      console.log(selectedSheet);
                      updateSelectedSheet({ race: race });

                      console.log(selectedSheet);
                    }}
                  >
                    {/* // TODO: ADD NEXTJS IMAGE TAG */}
                    <img
                      className="w-36 h-36 object-contain"
                      loading="lazy"
                      alt={race.name}
                      src={race?.picture}
                    />
                    <h4 className="uppercase font-medium mt-2">{race.name}</h4>
                  </button>
                ))}
              </section>
            </>
          );
        })}
      </section>
      <Link
        href={`/sheets/${selectedSheet.name}/class`}
        className="fixed bottom-20 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
      >
        <GiBroadheadArrow />
      </Link>
      <Link
        href={"/sheets"}
        className="fixed bottom-20 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
      >
        <GiBoomerang />
      </Link>
    </div>
  );
}
