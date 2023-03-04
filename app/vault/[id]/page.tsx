"use client";
import { Button } from "@/app/components/common/Button";
import React, { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import Select from "react-select";
import { useSheetStore } from "@/app/utils/store";
import { toast } from "react-toastify";
import InitiativeTracker from "../../components/vault/initiativeTracker";
import {
  getAllUsers,
  getCampaignById,
  getSheetWithCampaignIdAndUserId,
  getUserFromUserId,
  updateCampaign,
} from "@/app/utils/apiCalls";
import { Race } from "@/data/races/types";
import { GiEmbryo, GiFlamingSheet } from "react-icons/gi";
import Image from "next/image";

function UserEntry({
  userId,
  campaignId,
}: {
  userId: string;
  campaignId: string;
}) {
  const [user, setUser] = useState<{ username: string }>();
  const [sheet, setSheet] = useState<{ name: string; race: Race }>();

  useEffect(() => {
    getUserFromUserId(userId).then((res: any) => {
      setUser(res);
    });
    getSheetWithCampaignIdAndUserId(campaignId, userId).then((resp) => {
      console.log(resp);
      setSheet(resp.data);
    });
  }, []);

  return (
    <div className="w-full pr-10 flex items-center border-b-2 py-8 border-light-secondary dark:border-dark-secondary">
      <Image
        alt={sheet?.race.name}
        className="object-contain w-32 h-32"
        width={128}
        height={128}
        src={sheet?.race?.picture!}
      />
      {sheet && (
        <>
          <section className="flex flex-col">
            <p className="uppercase font-semibold text-3xl">{sheet?.name}</p>
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
  const updateUsers = useSheetStore((state) => state.updateUsers);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [options, setOptions] = useState([]);
  const [campaign, setCampaign] = useState<{ name: string; users: string[] }>();
  const [users, setUsers] = useState([]);
  const user = useSheetStore((state) => state.user);

  function toggleModal() {
    setOpenModal((openModal) => !openModal);
    getAllUsers().then((res) => {
      const arr: any = [];
      res.map((user: any) => {
        return arr.push({ value: user.id, label: user.username });
      });
      setOptions(arr);
    });
  }

  function DoUpdateUsers() {
    updateUsers(users, context.params.id, campaign);
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

        {openModal && (
          <div
            className="w-screen flex justify-center items-center h-screen absolute inset-0 bg-[#00000060]"
            typeof="button"
            data-value="parent"
            onClick={(event: any) => {
              event.preventDefault();
              let dataValue = (event.target as HTMLElement).getAttribute(
                "data-value"
              );
              if (dataValue === "parent") {
                setOpenModal((openModal) => !openModal);
              }
            }}
          >
            <div
              data-value="child"
              className="w-1/3 h-1/2 min-w-[500px] flex flex-col justify-center gap-8 items-center bg-light-secondary rounded-md"
            >
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

              <Button onClick={() => DoUpdateUsers()}>Confirm</Button>
            </div>
          </div>
        )}
      </div>
      <InitiativeTracker />
    </div>
  );
}
