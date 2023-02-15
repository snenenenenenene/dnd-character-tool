"use client";

import React, { useState } from "react";
import { races } from "@/data/races/races";
import _ from "lodash";
import { Race } from "@/data/races/types";
import Link from "next/link";
import { GiBoomerang, GiBroadheadArrow } from "react-icons/gi";
import { CharacterForm } from "@/app/components/character/CharacterForm";

export default function RaceSelection() {
  return (
    <div className="w-full h-full flex">
      <section className="w-64 text-center border-r-2 border-r-light h-full pr-8 overflow-scroll">
        {Object.entries(groups).map(([expansion, races]) => {
          return (
            <div key={expansion}>
              <hr className="my-4" />
              <h3 className="font-bold uppercase py-4">{expansion}</h3>
              <section className="flex flex-col">
                {races.map((race: Race) => (
                  <button
                    className="border-b-2 border-light-secondary transition-all filter hover:drop-shadow-lg flex justify-center items-center hover:border-b-light-accent flex-col py-1"
                    key={race.name}
                    value={race.name}
                    onClick={() => {
                      if (selectedRaces.length < 2) {
                        setSelectedRaces([...selectedRaces, race]);
                      }
                    }}
                  >
                    <h4>{race.name}</h4>
                  </button>
                ))}
              </section>
            </div>
          );
        })}
      </section>

      <section className="w-full h-full flex px-8">
        <section className="flex w-full h-full">
          {selectedRaces &&
            selectedRaces?.length > 0 &&
            selectedRaces.map((r, i) => (
              <CharacterForm
                currRace={r}
                charIndex={i}
                key={r.name}
                setSelectedRaces={setSelectedRaces}
              />
            ))}
        </section>
      </section>

      <Link
        href={"/sheets/new/classes"}
        className="fixed bottom-1 right-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
      >
        <GiBroadheadArrow />
      </Link>

      <Link
        href={"/sheets/new"}
        className="fixed bottom-1 left-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
      >
        <GiBoomerang />
      </Link>
    </div>
  );
}
