"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { List } from "../components/sheets/List";
import { getAllSheets } from "../utils/apiCalls";
import { Sheet, useSheetStore } from "../utils/store";

export default function SheetList() {
  const [sheets, setSheets] = useState<Sheet[]>();
  const user = useSheetStore((state) => state.user);

  useEffect(() => {
    getAllSheets({ userId: user?.record?.id })
      .then((res: any) => {
        setSheets(res);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return (
    <>
      <section className="text-3xl font-bold flex items-center py-4 pl-5 border-b-2 border-light-secondary dark:border-dark-secondary uppercase">
        <h1>Sheets</h1>
      </section>
      <List sheets={sheets} />
    </>
  );
}
