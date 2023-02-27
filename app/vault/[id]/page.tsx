"use client";
import { Button } from "@/app/components/common/Button";
import React, { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import Select from "react-select";
import { useSheetStore } from "@/app/utils/store";
import { toast } from "react-toastify";

function UserEntry({
  userId,
  campaignId,
}: {
  userId: string;
  campaignId: string;
}) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);
  const [user, setUser] = useState({});
  const [sheet, setSheet] = useState({});
  useEffect(() => {
    pb.collection("users")
      .getOne(userId)
      .then((res: any) => {
        setUser(res);
      });
  }, []);

  useEffect(() => {
    //get all sheets where the campaign.id is equal to the campaignId
    console.log(userId);
    pb.collection("sheets")
      .getFirstListItem(`campaign.id="${campaignId}" && user.id="${userId}"`)
      .then((resp) => {
        console.log(resp);
        setSheet(resp.data);
      });
  }, []);

  return (
    <div className="w-full flex justify-between items-center">
      <p>{user.username}</p>
      {sheet && <p>{sheet.name}</p>}
    </div>
  );
}

export default function Campaign(context: any) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [options, setOptions] = useState([]);
  const [campaign, setCampaign] = useState({});
  const [users, setUsers] = useState([]);

  const user = useSheetStore((state) => state.user);

  function toggleModal() {
    setOpenModal((openModal) => !openModal);
    pb.collection("users")
      .getFullList(200)
      .then((res: any) => {
        const arr: any = [];
        res.map((user: any) => {
          return arr.push({ value: user.id, label: user.username });
        });
        setOptions(arr);
      });
  }

  function updateUsers() {
    const data = {
      users: users,
      dm: user.record.id,
      name: campaign.name,
    };

    pb.collection("campaigns")
      .update(context.params.id, data)
      .then((resp) => {
        console.log(resp);
        setCampaign(resp);
        toast.success("Campaign updated!");
      })
      .catch((err: any) => {
        console.log(err);
      });
    toggleModal();
  }

  useEffect(() => {
    pb.collection("campaigns")
      .getOne(context.params.id)
      .then((res: any) => {
        console.log(res);
        setCampaign(res);
      });
  }, []);

  return (
    <div className="w-full h-full">
      <button
        className="w-full flex justify-center items-center h-10 border-b-2 border-light-primary hover:bg-light-primary px-8 py-3 hover:text-light-text"
        onClick={() => toggleModal()}
      >
        Add user
      </button>
      {campaign.users && (
        <div className="w-full flex flex-col gap-4">
          {campaign.users.map((userId: string) => (
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
              className="basic-multi-select"
              classNamePrefix="select"
              noOptionsMessage={() => "No users"}
            />

            <Button onClick={() => updateUsers()}>Confirm</Button>
          </div>
        </div>
      )}
    </div>
  );
}
