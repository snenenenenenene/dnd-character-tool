"use client";

import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import { Sheet } from "@/app/utils/store";
import { races } from "@/data/races/races";
import { Race } from "@/data/races/types";
import _ from "lodash";
import Image from "next/image";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiBoomerang, GiBroadheadArrow } from "react-icons/gi";

export default function Sheets(context: any) {
  const [sheet, setSheet] = useState<{
    data: Sheet;
    campaign: string;
    user: string;
  } | null>(null);

  useEffect(() => {
    getSheetWithId(context.params.id)
      .then((res: any) => {
        setSheet(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const groups = _.groupBy(races, "expansion");

  return (
    <div className="w-full relative h-full flex flex-col">
      <section
        id="title"
        className="w-full py-5 flex items-center border-b-2 pl-10 border-light-secondary"
      >
        <h1 className="text-xl font-semibold ">Pick your race</h1>
      </section>

      <section className="flex flex-col px-10">
        {Object.entries(groups).map(([expansion, races]) => {
          return (
            <>
              <h3 className="font-bold uppercase py-4" key={expansion}>
                {expansion}
              </h3>
              <section className="grid gap-4 grid-cols-3 mx-auto">
                {races.map((race: Race) => (
                  <button
                    className={`${
                      sheet?.data?.race?.name === race.name
                        ? "border-light-accent shadow-lg"
                        : "border-light-primary"
                    }  border-2  transition-all filter hover:drop-shadow-lg flex justify-center items-center hover:border-light-secondary h-48 w-60 flex-col py-1`}
                    key={race?.name}
                    value={race?.name}
                    onClick={() => {
                      updateSheetWithId(
                        context.params.id,
                        {
                          ...sheet?.data,
                          race: race,
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

                      // setSheet((prev: any) => ({

                      //   ...prev,
                      //   data: {
                      //     ...prev?.data,
                      //     race: race,
                      //     stats: {
                      //       strength:
                      //         Math.floor(
                      //           (Number(prev?.data?.thrownStats?.strength) +
                      //             10) /
                      //             2
                      //         ) +
                      //         Number(
                      //           prev?.data?.race?.traits?.abilityScoreIncrease
                      //             ?.strength || 0
                      //         ),
                      //       dexterity:
                      //         Math.floor(
                      //           (Number(prev?.data?.thrownStats?.dexterity) +
                      //             10) /
                      //             2
                      //         ) +
                      //         Number(
                      //           prev?.data?.race?.traits?.abilityScoreIncrease
                      //             ?.dexterity || 0
                      //         ),
                      //       constitution:
                      //         Math.floor(
                      //           (Number(prev?.data?.thrownStats?.constitution) +
                      //             10) /
                      //             2
                      //         ) +
                      //         Number(
                      //           prev?.data?.race?.traits?.abilityScoreIncrease
                      //             ?.constitution || 0
                      //         ),
                      //       intelligence:
                      //         Math.floor(
                      //           (Number(prev?.data?.thrownStats?.intelligence) +
                      //             10) /
                      //             2
                      //         ) +
                      //         Number(
                      //           prev?.data?.race?.traits?.abilityScoreIncrease
                      //             ?.intelligence || 0
                      //         ),
                      //       wisdom:
                      //         Math.floor(
                      //           (Number(prev?.data?.thrownStats?.wisdom) + 10) /
                      //             2
                      //         ) +
                      //         Number(
                      //           prev?.data?.race?.traits?.abilityScoreIncrease
                      //             ?.wisdom || 0
                      //         ),
                      //       charisma:
                      //         Math.floor(
                      //           (Number(prev?.data?.thrownStats?.charisma) +
                      //             10) /
                      //             2
                      //         ) +
                      //         Number(
                      //           prev?.data?.race?.traits?.abilityScoreIncrease
                      //             ?.charisma || 0
                      //         ),
                      //     },
                      //   },
                      // })),
                      //   () => updateSheet();
                    }}
                  >
                    {/* // TODO: ADD NEXTJS IMAGE TAG */}
                    <Image
                      className="w-36 h-36 object-contain"
                      width={144}
                      height={144}
                      alt={race.name}
                      src={race?.picture!}
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
        href={`/sheets/${context.params.id}`}
        className="fixed bottom-32 z-50 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center hover:to-cyan-500 transition-colors text-xl"
      >
        <GiBroadheadArrow />
      </Link>
      <Link
        href={"/sheets"}
        className="fixed bottom-32 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center hover:to-cyan-500 transition-colors text-xl"
      >
        <GiBoomerang />
      </Link>
    </div>
  );
}
