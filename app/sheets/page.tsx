"use client";
import { useEffect, useState } from "react";
import { List } from "../components/sheets/List";
import { getAllSheets } from "../utils/apiCalls";
import { useSheetStore } from "../utils/store";

export default function SheetList() {
  const [sheets, setSheets]: any = useState();
  const user = useSheetStore((state) => state.user);

  // const [options, setOptions] = useState<any>([]);
  useEffect(() => {
    // getAllCampaigns().then((res) => {
    //   const mappedCampaigns = res.map((campaign: any) => {
    //     return {
    //       value: campaign.id,
    //       label: campaign.name,
    //     };
    //   });

    //   setOptions(mappedCampaigns);
    // });

    getAllSheets({ userId: user?.record?.id })
      .then((res) => {
        setSheets(res);
      })
      .catch((err) => {
        console.error(err);
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
