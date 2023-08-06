// @ts-ignore: Object is possibly 'null'.
"use client";

import AbilitySidebar from "@/app/components/character/AbilitySidebar";
import ClassSideView from "@/app/components/character/ClassSideView";
import { StatSidebar } from "@/app/components/character/StatSidebar";
import NotesPopup from "@/app/components/common/NotesPopup";
import { PulsingNotifier } from "@/app/components/common/PulsingNotifier";
import { getSheetWithId } from "@/app/utils/apiCalls";
import { Sheet, useSheetStore } from "@/app/utils/store";
import * as crypto from "crypto";
import ErrorPage from "next/error";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  }, [params]);

  if (!selectedSheet || !selectedSheet?.data || crypto) {
    return <ErrorPage statusCode={404} />;
  }

  const LinkTab = ({
    name,
    notificationTrigger,
  }: {
    name: string;
    notificationTrigger?: boolean;
  }) => {
    return (
      <Link
        href={`/sheets/${params.id}/${name}`}
        className={` border-2 rounded-t-xl border-light-secondary h-14 w-40 flex justify-center items-center ${
          // use next router to check if the current path includes the name of the tab
          usePathname()?.includes(name)
            ? "border-0 bg-light-primary dark:bg-light-secondary dark:text-teal-400"
            : "border-2 bg-light-secondary hover:opacity-50 text-light-primary"
        }`}
      >
        {name}
        {notificationTrigger && <PulsingNotifier />}
      </Link>
    );
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-full">
        <section className="w-full h-full flex">
          <div className="w-full h-full flex relative">
            <ClassSideView />

            <div className="h-full w-full flex flex-col">
              <section className="button-section uppercase font-semibold h-24 w-full px-14 flex gap-x-4 items-end bg-light-secondary">
                {typeof window !== "undefined" && (
                  <>
                    <LinkTab name="class" />
                    <LinkTab name="race" />
                    <LinkTab
                      name="gear"
                      notificationTrigger={
                        selectedSheet?.data?.gear?.length === 0
                      }
                    />
                    <LinkTab
                      name="personality"
                      notificationTrigger={
                        selectedSheet?.data?.personality?.alignment.length === 0
                      }
                    />
                    <LinkTab
                      name="spells"
                      notificationTrigger={
                        selectedSheet?.data?.spells?.length === 0
                      }
                    />
                    <LinkTab name="wildshapes" />
                  </>
                )}
              </section>

              <section className="w-full h-full flex px-8 pt-5 overflow-hidden">
                {children}
              </section>
            </div>
          </div>
          <NotesPopup />
          <AbilitySidebar />
        </section>
      </div>
      <StatSidebar />
    </div>
  );
}
