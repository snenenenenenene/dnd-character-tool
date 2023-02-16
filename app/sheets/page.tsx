"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GiDiamondHilt } from "react-icons/gi";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { List } from "../components/sheets/List";
import { useSheetStore } from "../utils/store";

export default function SheetList() {
  const sheets = useSheetStore((state) => state.sheets);
  const [showTitleModal, setShowTitleModal] = useState<boolean>(false);
  const [characterName, setCharacterName] = useState<string>();
  const addSheet = useSheetStore((state) => state.addSheet);
  const setCurrentSheet = useSheetStore((state) => state.setCurrentSheet);
  const router = useRouter();
  function createCharacter() {
    if (characterName && characterName !== "") {
      addSheet({ name: characterName, race: null, class: null });
      setCurrentSheet(characterName);
      router.push(`/sheets/${characterName}`);
    }
  }
  return (
    <div>
      <List sheets={sheets} />
      <button
        className="absolute bottom-5 right-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-light-text w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:to-cyan-500 transition-colors text-xl"
        onClick={() => setShowTitleModal((showTitleModal) => !showTitleModal)}
      >
        <GiDiamondHilt />
      </button>

      {showTitleModal && (
        <div
          className="w-screen flex justify-center items-center h-screen absolute inset-0 bg-[#00000060]"
          data-value="parent"
          onClick={(event: any) => {
            event.preventDefault();
            let dataValue = (event.target as HTMLElement).getAttribute(
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
              value={characterName}
              className="w-80"
              onChange={(e: any) => setCharacterName(e.target.value)}
              placeholder="Character name"
            />
            <Button onClick={() => createCharacter()}>Create</Button>
          </div>
        </div>
      )}
    </div>
  );
}
