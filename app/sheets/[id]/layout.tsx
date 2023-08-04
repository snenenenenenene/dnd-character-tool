// @ts-ignore: Object is possibly 'null'.
"use client";
import AbilitySidebar from "@/app/components/character/AbilitySidebar";
import ClassSideView from "@/app/components/ClassSideView";
import { getSheetWithId } from "@/app/utils/apiCalls";
import { useSheetStore } from "@/app/utils/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { StatSidebar } from "../../components/character/StatSidebar";
interface LayoutArgs {
  children: React.ReactNode;
  params: {
    id: string;
  };
}
export default function Page({ children, params }: LayoutArgs) {
  const selectedSheet = useSheetStore((state) => state.selectedSheet);
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
                <Link
                  href={`/sheets/${params.id}/class`}
                  className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                    window.location.pathname.includes("class")
                      ? "border-0"
                      : "border-2 bg-light-secondary hover:opacity-5 text-light-primary"
                  }`}
                >
                  Overview
                </Link>
                {/* <Link
                  href={`/sheets/${params.id}/class`}
                  className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                    window.location.pathname.includes("class")
                      ? "border-0"
                      : "border-2 bg-light-secondary text-light-primary"
                  }`}
                >
                  Class
                </Link> */}
                <Link
                  href={`/sheets/${params.id}/race`}
                  className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                    window.location.pathname.includes("race")
                      ? "border-0"
                      : "border-2 bg-light-secondary hover:opacity-5 text-light-primary"
                  }`}
                >
                  Race
                </Link>

                <Link
                  href={`/sheets/${params.id}/gear`}
                  className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                    window.location.pathname.includes("gear")
                      ? "border-0"
                      : "border-2 bg-light-secondary hover:opacity-5 text-light-primary"
                  }`}
                >
                  Gear
                </Link>

                <Link
                  href={`/sheets/${params.id}/personality`}
                  className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                    window.location.pathname.includes("personality")
                      ? "border-0"
                      : "border-2 bg-light-secondary hover:opacity-5 text-light-primary"
                  }`}
                >
                  Personality
                </Link>
                <Link
                  href={`/sheets/${params.id}/spells`}
                  className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                    window.location.pathname.includes("spells")
                      ? "border-0"
                      : "border-2 bg-light-secondary hover:opacity-50 text-light-primary"
                  }`}
                >
                  Spells
                </Link>
                <Link
                  href={`/sheets/${params.id}/wildshapes`}
                  className={`bg-light-primary border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
                    window.location.pathname.includes("wildshapes")
                      ? "border-0"
                      : "border-2 bg-light-secondary hover:opacity-5 text-light-primary"
                  }`}
                >
                  Shapes
                </Link>
              </section>

              <section className="w-full h-full flex px-8 pt-5 overflow-hidden">
                {children}
              </section>
            </div>
          </div>
          <AbilitySidebar sheetId={params?.id} />
        </section>
      </div>
      <StatSidebar sheetId={params?.id} />
    </div>
  );
}
