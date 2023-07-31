/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import { updateSheetWithId } from "@/app/utils/apiCalls";
import { Sheet } from "@/app/utils/store";
import { Class } from "@/data/classes/types";
import React, { useState } from "react";
import { GiFlamer } from "react-icons/gi";
import { toast } from "react-toastify";
import { Input } from "../common/Input";

interface CharacterFormArgs {
  currClass: any;
  classIndex: number;
  setSheet: React.Dispatch<any>;
  sheet: Sheet;
  sheetId: string;
}

export const ClassEditor = ({
  currClass,
  classIndex,
  sheet,
  setSheet,
  sheetId,
}: CharacterFormArgs) => {
  const [featuresVisible, setFeaturesVisible] = useState<boolean>(false);

  return (
    <div
      className="flex flex-col w-full h-full relative px-10 overflow-hidden"
      key={currClass?.name}
    >
      <button
        className="w-8 h-8 flex justify-center items-center text-2xl bg-gradient-to-r from-yellow-500 to-red-500 shadow-2xl absolute top-0 right-0 rounded-full"
        onClick={() =>
          updateSheetWithId(
            sheetId,
            {
              ...sheet?.data,
              class: sheet.data?.class.filter(
                (c: Class) => c.name !== currClass.name
              ),
            },
            sheet?.campaign,
            sheet?.user!
          )
            .then((res: any) => {
              setSheet(res);
            })
            .catch((err) => {
              toast.error(err.message);
            })
        }
      >
        <GiFlamer />
      </button>
      <section className="flex justify-between h-48">
        <h4 className="text-5xl font-bold">{currClass?.name}</h4>
        <img
          alt={currClass?.name}
          src={currClass?.image}
          className="w-40 h-40 object-contain"
        />
      </section>
      <label htmlFor="level">Level</label>
      <Input
        id="level"
        type="number"
        className="w-16 h-16 flex justify-center items-center text-center"
        value={currClass.level}
        onChange={(e) => {
          const newLevel: number = Number(e.target.value);
          const otherClasses = sheet.data?.class.filter(
            (c: Class, i: number) => i !== classIndex
          );
          const totalOtherLevels = otherClasses.reduce(
            (acc: any, curr: any) => acc + curr.level,
            0
          );

          if (
            newLevel > 0 &&
            newLevel <= sheet?.data?.level &&
            Number(e.target.value) > 0 &&
            Number(e.target.value) <= sheet?.data?.level - totalOtherLevels
          ) {
            const newClass = sheet.data?.class.map((c: Class, i: number) => {
              if (currClass.name === c.name) {
                return { ...c, level: Number(e.target.value) };
              } else {
                return c;
              }
            });

            updateSheetWithId(
              sheetId,
              {
                ...sheet?.data,
                class: newClass,
              },
              sheet?.campaign,
              sheet?.user!
            )
              .then((res: any) => {
                toast.success(
                  `You are now a level ${newLevel} ${currClass.name}!`
                );
                setSheet(res);
              })
              .catch((err) => {
                toast.error(err.message);
              });
          }
        }}
        placeholder="0"
      />
      <section className="flex flex-col h-full overflow-hidden">
        <h4
          className="text-3xl font-bold"
          onClick={() => setFeaturesVisible(!featuresVisible)}
        >
          Features
        </h4>
        <section
          className={`flex flex-col w-full h-2/3 overflow-y-scroll gap-y-4 py-8 ${
            featuresVisible ? "flex flex-col" : "hidden"
          }`}
        >
          {currClass.features ? (
            currClass?.features?.map((feature: any) => {
              if (feature.level <= currClass.level)
                return (
                  <div key={feature.name} className="flex flex-col">
                    <h5 className="text-xl font-medium">{feature.name}</h5>
                    <p className="text">{feature.description}</p>
                  </div>
                );
            })
          ) : (
            <>WIP</>
          )}
        </section>
      </section>
    </div>
  );
};
