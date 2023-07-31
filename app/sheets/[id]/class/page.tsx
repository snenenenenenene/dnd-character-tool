"use client";

import { ClassEditor } from "@/app/components/character/ClassEditor";
import { getSheetWithId } from "@/app/utils/apiCalls";
import { useSheetStore } from "@/app/utils/store";
import { Class as ClassT } from "@/data/classes/types";
import { useEffect } from "react";

export default function Class(context: any) {
  const selectedSheet = useSheetStore((state) => state.selectedSheet);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);

  useEffect(() => {
    getSheetWithId(context.params.id).then((res: any) => {
      setSelectedSheet(res);
    });
  }, []);
  return (
    <section className="flex flex-col w-1/2 h-full overflow-y-scroll gap-5 pr-4">
      {selectedSheet?.data?.class &&
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
        ))}
    </section>
  );
}
