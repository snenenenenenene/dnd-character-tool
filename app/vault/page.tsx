"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GiDiamondHilt } from "react-icons/gi";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { Modal } from "../components/common/Modal";
import {
  createCampaign as postCampaign,
  getAllCampaigns,
} from "../utils/apiCalls";
import { useSheetStore } from "../utils/store";

export default function Vault() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [campaignName, setCampaignName] = useState<string>("");
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const user = useSheetStore((state) => state.user);

  const router = useRouter();

  async function createCampaign() {
    if (campaignName && campaignName !== "") {
      postCampaign({ name: campaignName, userId: user?.record?.id })
        .then((res) => {
          router.push(`/vault/${res.id}`);
          setShowModal(false);
          setCampaignName("");
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
      <section className="flex w-full h-full overflow-y-scroll flex-col">
        <section className="h-16 border-b-2 text-3xl font-bold uppercase border-light-secondary dark:border-dark-secondary flex justify-center items-center">
          <h1>Vault</h1>
        </section>
        {campaigns && campaigns.length > 0 ? (
          campaigns.map((campaign: any) => (
            <button
              className="border-b-2 px-5 border-light-secondary flex justify-center hover:text-light-primary hover:bg-light-secondary hover:dark:bg-dark-secondary hover:dark:text-dark-primary flex-col py-4"
              key={campaign.name}
              value={campaign.name}
              onClick={() => {
                router.push(`/vault/${campaign.id}`);
              }}
            >
              <h4>{campaign.name}</h4>
            </button>
          ))
        ) : (
          <p className="mt-5">No campaigns</p>
        )}
      </section>
      <button
        className="absolute bottom-5 right-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
        onClick={() => setShowModal((showModal) => !showModal)}
      >
        <GiDiamondHilt />
      </button>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Input
          value={campaignName}
          className="w-80"
          onChange={(e) => setCampaignName(e.target.value)}
          placeholder="Campaign Name"
        />
        <Button onClick={() => createCampaign()}>Create</Button>
      </Modal>
    </div>
  );
}
