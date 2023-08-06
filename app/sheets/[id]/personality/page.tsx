"use client";

import { Sheet, useSheetStore } from "@/app/utils/store";
import ErrorPage from "next/error";
import { useEffect } from "react";
export default function Personality(context: any) {
  const selectedSheet: Sheet = useSheetStore((state) => state.selectedSheet);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);

  useEffect(() => {
    setSelectedSheet(context?.params?.id);
  }, []);

  if (!selectedSheet || !selectedSheet?.data) {
    return <ErrorPage statusCode={404} />;
  }
  return <div>Personality</div>;
}
