"use client";

import { getSheetWithId } from "@/app/utils/apiCalls";
import { Sheet, useSheetStore } from "@/app/utils/store";
import ErrorPage from "next/error";
import { useEffect } from "react";

export default function Wildshapes(context: any) {
  const selectedSheet: Sheet = useSheetStore((state) => state.selectedSheet);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);

  useEffect(() => {
    getSheetWithId(context?.params?.id).then((res: any) => {
      setSelectedSheet(res);
    });
  }, []);

  if (!selectedSheet || !selectedSheet?.data) {
    return <ErrorPage statusCode={404} />;
  }

  return <div>{selectedSheet.data?.name}</div>;
}
