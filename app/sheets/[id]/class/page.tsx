"use client";

import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import { Sheet, useSheetStore } from "@/app/utils/store";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Class(context: any) {
  const selectedSheet: Sheet = useSheetStore((state) => state.selectedSheet);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);

  useEffect(() => {
    getSheetWithId(context.params.id).then((res: any) => {
      setSelectedSheet(res);
    });
  }, []);

  return (
    <section className="flex w-full h-full overflow-y-hidden pr-4 relative">
      {selectedSheet.data?.race?.picture && (
        <Image
          fill
          style={{ objectFit: "contain" }}
          src={selectedSheet?.data?.race?.picture}
          className="pointer-events-none -z-10"
          draggable={false}
          alt="player avatar"
        />
      )}
      <section className="bg-light-primary border-2 border-light-secondary w-[80%] p-4">
        <span className="flex flex-col">
          <h2 className="uppercase font-bold">Name</h2>
          <p>{selectedSheet?.data?.name}</p>
        </span>
        <span className="flex flex-col">
          <h2 className="uppercase font-bold">Alignment</h2>
          <p>{selectedSheet?.data?.personality.alignment}</p>
        </span>
        <span className="flex flex-col">
          <h2 className="uppercase font-bold">Race</h2>
          <p>{selectedSheet?.data?.race?.name}</p>
        </span>
        <span className="flex flex-col">
          <h2 className="uppercase font-bold">
            {selectedSheet?.data?.class?.length > 1 ? "Classes" : "Class"}
          </h2>
          <section className="flex flex-col">
            {selectedSheet?.data?.class &&
              selectedSheet?.data?.class.map((c) => (
                <section key={c.name} className="flex justify-between">
                  <span className="flex">
                    <p>
                      {c.name} lvl: {c.level}
                    </p>
                  </span>
                  <section className="flex gap-x-1">
                    <button
                      className="w-4 h-full py-0 px-0"
                      onClick={() => {
                        // delete the class from the sheet
                        updateSheetWithId(
                          selectedSheet.id,
                          {
                            ...selectedSheet.data,
                            class: selectedSheet.data?.class.filter(
                              (_c: any) => c.name !== _c.name
                            ),
                          },
                          selectedSheet.campaign,
                          selectedSheet.user!
                        ).then((res: any) => {
                          setSelectedSheet(res);
                        });
                      }}
                    >
                      x
                    </button>
                    <button
                      className="w-4 h-full py-0 px-0"
                      onClick={() => {
                        const otherClasses = selectedSheet.data?.class.filter(
                          (_c: any) => c.name !== _c.name
                        );
                        const totalOtherLevels = otherClasses.reduce(
                          (acc: any, curr: any) => acc + curr.level,
                          0
                        );

                        if (
                          c.level > 0 &&
                          c.level <= selectedSheet?.data?.level &&
                          Number(c.level - 1) > 0 &&
                          Number(c.level - 1) <=
                            selectedSheet?.data?.level - totalOtherLevels
                        ) {
                          const newClass = selectedSheet.data?.class.map(
                            (_c: any) => {
                              if (c.name === _c.name) {
                                return { ...c, level: Number(c.level - 1) };
                              } else {
                                return _c;
                              }
                            }
                          );

                          updateSheetWithId(
                            selectedSheet.id,
                            {
                              ...selectedSheet?.data,
                              class: newClass,
                            },
                            selectedSheet?.campaign,
                            selectedSheet?.user!
                          )
                            .then((res: any) => {
                              toast.success(
                                `You are now a level ${c.level - 1} ${c.name}!`
                              );
                              setSelectedSheet(res);
                            })
                            .catch((err) => {
                              toast.error(err.message);
                            });
                        }
                      }}
                    >
                      -
                    </button>
                    <button
                      className="w-4 h-full py-0 px-0"
                      onClick={() => {
                        const otherClasses = selectedSheet.data?.class.filter(
                          (_c: any) => c.name !== _c.name
                        );
                        const totalOtherLevels = otherClasses.reduce(
                          (acc: any, curr: any) => acc + curr.level,
                          0
                        );

                        if (
                          c.level >= 0 &&
                          c.level <= selectedSheet?.data?.level &&
                          Number(c.level + 1) > 0 &&
                          Number(c.level + 1) <=
                            selectedSheet?.data?.level - totalOtherLevels
                        ) {
                          const newClass = selectedSheet.data?.class.map(
                            (_c: any) => {
                              if (c.name === _c.name) {
                                return { ...c, level: Number(c.level + 1) };
                              } else {
                                return _c;
                              }
                            }
                          );

                          updateSheetWithId(
                            selectedSheet.id,
                            {
                              ...selectedSheet?.data,
                              class: newClass,
                            },
                            selectedSheet?.campaign,
                            selectedSheet?.user!
                          )
                            .then((res: any) => {
                              toast.success(
                                `You are now a level ${c.level + 1} ${c.name}!`
                              );
                              setSelectedSheet(res);
                            })
                            .catch((err) => {
                              toast.error(err.message);
                            });
                        }
                      }}
                    >
                      +
                    </button>
                  </section>
                </section>
              ))}
          </section>
        </span>
      </section>
      <section className="bg-transparent w-full text-light-primary p-4" />
      <section className="bg-light-primary border-2 border-light-secondary w-full p-4">
        <span className="flex flex-col pb-4">
          <h2 className="uppercase font-bold">Feats</h2>
          <span>
            {
              // concat all features from all classes in the sheet and sort them by level also filter out features that are higher level than the class level
              selectedSheet?.data?.class &&
                selectedSheet?.data?.class?.length > 0 &&
                selectedSheet.data.class
                  .map((c) => {
                    return c.features?.filter((f) => f.level <= c.level);
                  })
                  .flat()
                  .sort((a, b) => a?.level! - b?.level!)
                  .map((f) => {
                    return (
                      <span key={f?.name} className="flex flex-col">
                        <h3 className="text-sm font-semibold">{f?.name}</h3>
                        <p className="text-xs">{f?.description}</p>
                      </span>
                    );
                  })
            }
          </span>

          {/* {selectedSheet?.data?.class &&
            selectedSheet?.data?.class?.length > 0 &&
            selectedSheet.data.class.map((c) => {
              return (
                c.features &&
                c.features.length > 0 &&
                c.features
                  .filter((f) => f.level <= c.level)

                  .map((f) => {
                    return (
                      <span key={f.name} className="flex flex-col">
                        <h3 className="text-sm font-semibold">{f.name}</h3>
                        <p className="text-xs">{f.description}</p>
                      </span>
                    );
                  })
              );
            })} */}
        </span>
      </section>

      {/* {selectedSheet?.data?.class &&
        selectedSheet?.data?.class?.length > 0 &&
        selectedSheet?.data?.class?.map((c: ClassT, i: number) => (
          <ClassEditor
            setSheet={setSelectedSheet}
            sheetId={context.params.id}
            sheet={selectedSheet}
            currClass={c}
            classIndex={i}
            key={c.name}
          />
        ))} */}
    </section>
  );
}
