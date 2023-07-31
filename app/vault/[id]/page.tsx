"use client";
import { Button } from "@/app/components/common/Button";
import { Modal } from "@/app/components/common/Modal";
import {
  getAllUsers,
  getCampaignById,
  getSheetWithCampaignIdAndUserId,
  getUserFromUserId,
  updateCampaign,
} from "@/app/utils/apiCalls";
import { useSheetStore } from "@/app/utils/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiEmbryo, GiFlamingSheet } from "react-icons/gi";
import Select from "react-select";
import { toast } from "react-toastify";
import InitiativeTracker from "../../components/vault/initiativeTracker";

function UserEntry({
  userId,
  campaignId,
}: {
  userId: string;
  campaignId: string;
}) {
  const [user, setUser] = useState<{ username: string }>();

  const selectedSheet = useSheetStore((state) => state.selectedSheet);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);

  useEffect(() => {
    getUserFromUserId(userId).then((res: any) => {
      setUser(res);
    });
    getSheetWithCampaignIdAndUserId(campaignId, userId).then((resp) => {
      setSelectedSheet(resp.data);
    });
  }, []);

  return (
    <div className="w-full pr-10 flex items-center border-b-2 py-8 border-light-secondary dark:border-dark-secondary">
      {selectedSheet && (
        <Image
          alt={selectedSheet?.race?.name}
          className="object-contain w-32 h-32"
          width={128}
          height={128}
          src={selectedSheet?.race?.picture!}
        />
      )}
      {selectedSheet && (
        <>
          <section className="flex flex-col">
            <p className="uppercase font-semibold text-3xl">
              {selectedSheet?.name}
            </p>
            <p>{user?.username}</p>
          </section>
          <button
            className="text-3xl ml-auto font-bold w-14 h-14 dark:bg-dark-secondary dark:text-dark-primary hover:bg-light-primary hover:text-light-secondary bg-light-secondary text-light-primary rounded-full flex justify-center items-center my-auto"
            onClick={() => {}}
          >
            <GiFlamingSheet />
          </button>
        </>
      )}
    </div>
  );
}

export default function Campaign(context: any) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [options, setOptions] = useState([]);
  const [campaign, setCampaign] = useState<{ name: string; users: string[] }>();
  const [users, setUsers] = useState([]);
  const user = useSheetStore((state) => state.user);

  function toggleModal() {
    setShowModal((showModal) => !showModal);
    getAllUsers().then((res) => {
      const arr: any = [];
      res.map((user: any) => {
        return arr.push({ value: user.id, label: user.username });
      });
      setOptions(arr);
    });
  }

  function DoUpdateUsers() {
    const data = {
      users: users,
      dm: user.record.id,
      name: campaign?.name,
    };

    updateCampaign(context.params.id, data)
      .then((resp: any) => {
        setCampaign(resp);
        toast.success("Campaign updated!");
      })
      .catch((err: any) => {
        console.error(err);
      });
    toggleModal();
  }

  useEffect(() => {
    getCampaignById(context.params.id)
      .then((res: any) => {
        console.log(res);
        setCampaign(res);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="w-full h-full">
        <section className="h-40 flex gap-x-4 p-4">
          <Link
            href={`/sheets/${context.params.id}/race`}
            className="bg-light-accent h-14 w-40 flex justify-center items-center text-light-primary"
          >
            Sheets
          </Link>
          <Link
            href={`/sheets/${context.params.id}`}
            className="bg-orange-600 h-14 w-40 flex justify-center items-center text-light-primary"
          >
            Assets
          </Link>
        </section>
        <button
          className="fixed bottom-20 right-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center hover:to-cyan-500 transition-colors text-xl"
          onClick={() => toggleModal()}
        >
          <GiEmbryo />
        </button>
        {campaign?.users && (
          <div className="w-full flex flex-col gap-4">
            {campaign?.users?.map((userId: string) => (
              <UserEntry
                campaignId={context.params.id}
                userId={userId}
                key={userId}
              />
            ))}
          </div>
        )}

        <Modal showModal={showModal} setShowModal={setShowModal}>
          <Select
            isMulti={true}
            options={options}
            onChange={(users: any) =>
              setUsers(users.map((user: any) => user.value))
            }
            className="basic-multi-select w-3/4"
            classNamePrefix="select"
            placeholder="Select users"
            noOptionsMessage={() => "No users"}
          />

          <Button
            className="w-full m-2 mt-auto"
            onClick={() => DoUpdateUsers()}
          >
            Confirm
          </Button>
        </Modal>
      </div>
      <InitiativeTracker />
    </div>
  );
}
