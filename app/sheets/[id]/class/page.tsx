"use client";

import { ClassEditor } from "@/app/components/character/ClassEditor";
import { getSheetWithId } from "@/app/utils/apiCalls";
import { Sheet } from "@/app/utils/store";
import { Class as ClassT } from "@/data/classes/types";
import { useEffect, useState } from "react";

export default function Class(context: any) {
  const [sheet, setSheet]: any = useState<Sheet>();
  useEffect(() => {
    getSheetWithId(context.params.id).then((res: any) => {
      setSheet(res);
    });
  }, []);
  return (
    <section className="flex flex-col w-1/2 h-full overflow-y-scroll gap-5 pr-4">
      {sheet?.data?.class &&
        sheet?.data?.class?.length > 0 &&
        sheet?.data?.class?.map((c: ClassT, i: number) => (
          <ClassEditor
            setSheet={setSheet}
            sheetId={context.params.id}
            sheet={sheet}
            currClass={c}
            classIndex={i}
            key={c.name}
          />
        ))}
    </section>
  );
}
