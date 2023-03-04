/* eslint-disable no-unused-vars */
import { updateSheetWithId } from "@/app/utils/apiCalls";
import { Sheet, useSheetStore } from "@/app/utils/store";
import { Class } from "@/data/classes/types";
import { Race } from "@/data/races/types";
import React, { useState } from "react";
import { GiFlamer } from "react-icons/gi";
import { Input } from "../common/Input";

interface CharacterFormArgs {
  currClass: any;
  classIndex: number;
  setSheet: React.Dispatch<any>;
  sheet: {
    data: Sheet;
    campaign: string;
    user: string;
  };
  sheetId: string;
}

export const CharacterForm = ({
  currClass,
  classIndex,
  sheet,
  setSheet,
  sheetId,
}: CharacterFormArgs) => {
  const [level, setLevel] = useState<number>(0);
  const [featuresVisible, setFeaturesVisible] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-1/2 relative px-10" key={currClass?.name}>
      <button
        className="w-8 h-8 flex justify-center items-center text-2xl bg-gradient-to-r from-yellow-500 to-red-500 shadow-2xl absolute top-0 right-0 rounded-full"
        onClick={() =>
          updateSheetWithId(
            sheetId,
            {
              ...sheet?.data,
              class: sheet.data.class.filter(
                (c: Class) => c.name !== currClass.name
              ),
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
            })
        }
      >
        <GiFlamer />
      </button>
      <section className="flex justify-between h-48">
        <h4 className="text-6xl font-bold">{currClass?.name}</h4>
        <img src={currClass?.image} className="w-40 h-40 object-contain" />
      </section>
      <label htmlFor="level">Level</label>
      <Input
        id="level"
        type="number"
        className="w-16 h-16 flex justify-center items-center text-center"
        value={currClass.level}
        onChange={(e) => {
          const newLevel: number = Number(e.target.value);
          const otherClasses = sheet.data.class.filter(
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
            const newClass = sheet.data.class.map((c: Class, i: number) => {
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
                console.log(res);
                setSheet(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }}
        placeholder="0"
      />
      <section>
        <h4
          className="text-3xl font-bold"
          onClick={() => setFeaturesVisible(!featuresVisible)}
        >
          Features
        </h4>
        <section
          className={`flex flex-col w-full ${
            featuresVisible ? "visible" : "invisible"
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
