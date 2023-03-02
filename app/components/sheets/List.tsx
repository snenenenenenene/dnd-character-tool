import { Sheet, useSheetStore } from "@/app/utils/store";
import { useRouter } from "next/navigation";
import React from "react";

interface SheetResponse {
  id: string;
  data: Sheet;
  campaign: string;
}
interface ListArgs {
  sheets?: SheetResponse[];
}

export const List = ({ sheets }: ListArgs) => {
  const router = useRouter();
  const selectSheet = useSheetStore((state) => state.selectSheet);

  return (
    <div className="flex flex-col gap-8 w-full">
      {sheets && sheets.length > 0 ? (
        sheets?.map((sheet, i) => (
          <button
            className="w-1/2 flex justify-between items-center h-10 border-b-2 border-light-primary hover:bg-light-primary px-8 py-3 hover:text-light-secondary"
            key={i}
            onClick={() => {
              selectSheet(sheet?.data?.name);
              router.push(`/sheets/${sheet?.id}`);
            }}
          >
            <p>{sheet?.data?.name}</p>
            <p>{sheet?.data?.race?.name}</p>
            <p>Level: {sheet?.data?.level}</p>
            <p>{sheet?.campaign ? sheet?.campaign : <>None</>}</p>
          </button>
        ))
      ) : (
        <p>No sheets! Create a sheet and start your adventure!</p>
      )}
    </div>
  );
};
