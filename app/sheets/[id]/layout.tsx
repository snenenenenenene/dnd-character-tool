// @ts-ignore: Object is possibly 'null'.
"use client";
import {
  default as AbilitySidebar,
  default as ClassSideView,
} from "@/app/components/character/ClassSideView";
import { StatSidebar } from "@/app/components/character/StatSidebar";
import { PulsingNotifier } from "@/app/components/common/PulsingNotifier";
import { getSheetWithId } from "@/app/utils/apiCalls";
import { Sheet, useSheetStore } from "@/app/utils/store";
import Link from "next/link";
import React, { useEffect } from "react";
interface LayoutArgs {
  children: React.ReactNode;
  params: {
    id: string;
  };
}
export default function Page({ children, params }: LayoutArgs) {
  const selectedSheet: Sheet = useSheetStore((state) => state.selectedSheet);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);

  useEffect(() => {
    getSheetWithId(params.id).then((res: any) => {
      setSelectedSheet(res);
    });
  }, []);

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-full">
        <section className="w-full h-full flex">
          <div className="w-full h-full flex">
            <ClassSideView />

            <div className="h-full w-full flex flex-col">
              <section className="button-section uppercase font-semibold h-24 w-full px-14 flex gap-x-4 items-end bg-light-secondary">
                {typeof window !== "undefined" && (
                  <>
                    <Link
                      href={`/sheets/${params.id}/class`}
                      className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                        window?.location.pathname.includes("class")
                          ? "border-0"
                          : "border-2 bg-light-secondary hover:opacity-5 text-light-primary"
                      }`}
                    >
                      Overview
                    </Link>
                    {/* <Link
                  href={`/sheets/${params.id}/class`}
                  className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                    window?.location.pathname.includes("class")
                      ? "border-0"
                      : "border-2 bg-light-secondary text-light-primary"
                  }`}
                >
                  Class
                </Link> */}
                    <Link
                      href={`/sheets/${params.id}/race`}
                      className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                        window?.location.pathname.includes("race")
                          ? "border-0"
                          : "border-2 bg-light-secondary hover:opacity-5 text-light-primary"
                      }`}
                    >
                      Race
                    </Link>

                    <Link
                      href={`/sheets/${params.id}/gear`}
                      className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                        window?.location.pathname.includes("gear")
                          ? "border-0"
                          : "border-2 bg-light-secondary hover:opacity-5 text-light-primary"
                      }`}
                    >
                      Gear
                      {selectedSheet?.data?.gear?.length === 0 && (
                        <PulsingNotifier />
                      )}
                    </Link>

                    <Link
                      href={`/sheets/${params.id}/personality`}
                      className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                        window?.location.pathname.includes("personality")
                          ? "border-0"
                          : "border-2 bg-light-secondary hover:opacity-5 text-light-primary"
                      }`}
                    >
                      Personality
                      {selectedSheet?.data?.personality?.alignment?.length ===
                        0 && <PulsingNotifier />}
                    </Link>
                    <Link
                      href={`/sheets/${params.id}/spells`}
                      className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                        window?.location.pathname.includes("spells")
                          ? "border-0"
                          : "border-2 bg-light-secondary hover:opacity-50 text-light-primary"
                      }`}
                    >
                      Spells
                      {!selectedSheet?.data?.spells?.length && (
                        <PulsingNotifier />
                      )}
                    </Link>
                    <Link
                      href={`/sheets/${params.id}/wildshapes`}
                      className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                        window?.location.pathname.includes("wildshapes")
                          ? "border-0"
                          : "border-2 bg-light-secondary hover:opacity-5 text-light-primary"
                      }`}
                    >
                      Shapes
                    </Link>
                  </>
                )}
              </section>

              <section className="w-full h-full flex px-8 pt-5 overflow-hidden">
                {children}
              </section>
            </div>
          </div>
          <AbilitySidebar />
        </section>
      </div>
      <StatSidebar sheetId={params?.id} />
    </div>
  );
}
