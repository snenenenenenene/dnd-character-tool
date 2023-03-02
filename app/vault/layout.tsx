"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiDiamondHilt } from "react-icons/gi";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { useSheetStore } from "../utils/store";
import { getAllCampaigns } from "../utils/apiCalls";
interface LayoutArgs {
  children: React.ReactNode;
}
export default function Page({ children }: LayoutArgs) {
  const [showTitleModal, setShowTitleModal] = useState<boolean>(false);
  const [campaignName, setCampaignName] = useState<string>("");
  const [campaigns, setCampaigns] = useState<any[]>([]);

  const addCampaign = useSheetStore((state) => state.addCampaign);

  const router = useRouter();

  async function createCampaign() {
    if (campaignName && campaignName !== "") {
      addCampaign(campaignName);
      setShowTitleModal(false);
      setCampaignName("");
      getAllCampaigns()
        .then((res) => {
          setCampaigns(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  useEffect(() => {
    getAllCampaigns()
      .then((res) => {
        setCampaigns(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="w-full h-full flex  flex-col">
      <section className="flex w-full h-full overflow-y-scroll">
        <section className="w-64 text-center border-r-2 border-r-light h-full pr-8 overflow-y-scroll">
          <h1>Vault</h1>
          {campaigns.map((campaign: any) => (
            <button
              className="border-b-2 border-light-secondary transition-all filter hover:drop-shadow-lg flex justify-center items-center hover:border-b-light-accent flex-col py-1"
              key={campaign.name}
              value={campaign.name}
              onClick={() => {
                router.push(`/vault/${campaign.id}`);
              }}
            >
              <h4>{campaign.name}</h4>
            </button>
          ))}
        </section>
        {children}
      </section>
      <button
        className="absolute bottom-5 right-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
        onClick={() => setShowTitleModal((showTitleModal) => !showTitleModal)}
      >
        <GiDiamondHilt />
      </button>

      {showTitleModal && (
        <div
          className="w-screen flex justify-center items-center h-screen absolute inset-0 bg-[#00000060]"
          typeof="button"
          data-value="parent"
          onClick={(e: any) => {
            e.preventDefault();
            let dataValue = (e.target as HTMLElement).getAttribute(
              "data-value"
            );
            if (dataValue === "parent") {
              setShowTitleModal((showTitleModal) => !showTitleModal);
            }
          }}
        >
          <div
            data-value="child"
            className="w-1/3 h-1/2 min-w-[500px] flex flex-col justify-center gap-8 items-center bg-light-secondary rounded-md"
          >
            <Input
              value={campaignName}
              className="w-80"
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Campaign Name"
            />
            <Button onClick={() => createCampaign()}>Create</Button>
          </div>
        </div>
      )}
    </div>
  );
}
