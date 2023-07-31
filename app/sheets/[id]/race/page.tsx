"use client";

import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import { SheetData, useSheetStore } from "@/app/utils/store";
import { races } from "@/data/races/races";
import { Race } from "@/data/races/types";
import _ from "lodash";
import Image from "next/image";

import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Sheets(context: any) {
  const selectedSheet: {
    data: SheetData;
    campaign: string;
    user: string;
  } | null = useSheetStore((state) => state.selectedSheet);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);

  useEffect(() => {
    getSheetWithId(context.params.id)
      .then((res: any) => {
        setSelectedSheet(res);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  const groups = _.groupBy(races, "expansion");

  return (
    <div className="w-full relative h-full flex flex-col overflow-y-scroll">
      <section
        id="title"
        className="w-full py-5 flex items-center border-b-2 pl-10 border-light-secondary"
      >
        <h1 className="text-xl font-semibold ">Pick your race</h1>
      </section>

      <section className="flex flex-col px-10">
        {Object?.entries(groups).map(([expansion, races]) => {
          return (
            <>
              <h3 className="font-bold uppercase py-4" key={expansion}>
                {expansion}
              </h3>
              <section className="grid gap-4 grid-cols-3 mx-auto">
                {races.map((race: Race) => (
                  <button
                    className={`${
                      selectedSheet?.data?.race?.name === race.name
                        ? "border-light-accent shadow-lg"
                        : "border-light-primary"
                    }  border-2  transition-all filter hover:drop-shadow-lg flex justify-center items-center hover:border-light-secondary h-48 w-60 flex-col py-1`}
                    key={race?.name}
                    value={race?.name}
                    onClick={() => {
                      updateSheetWithId(
                        context.params.id,
                        {
                          ...selectedSheet?.data,
                          race: race,
                        },
                        selectedSheet?.campaign,
                        selectedSheet?.user!
                      )
                        .then((res: any) => {
                          toast.success("Updated sheet");
                          setSelectedSheet(res);
                        })
                        .catch(() => {
                          toast.error("Something went wrong");
                        });
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
    </div>
  );
}
