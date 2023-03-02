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
    <div className="w-full pr-10 flex items-center gap-8">
      <img className="object-contain w-32 h-32" src={sheet?.race?.picture} />
      {sheet && (
        <p className="uppercase font-semibold text-3xl">{sheet?.name}</p>
      )}
      <p className="ml-auto">{user?.username}</p>
    </div>
  );
}

export default function Campaign(context: any) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

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
          className="w-full flex justify-center items-center h-10 border-b-2 border-light-primary hover:bg-light-primary px-8 py-3 hover:text-light-text"
          onClick={() => toggleModal()}
        >
          Add user
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
