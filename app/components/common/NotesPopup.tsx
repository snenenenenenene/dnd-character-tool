"use client";
import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import { useSheetStore } from "@/app/utils/store";
import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function NotesPopup() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const selectedSheet = useSheetStore((state) => state.selectedSheet);
  const user = useSheetStore((state) => state.user);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);

  useEffect(() => {
    getSheetWithId(selectedSheet.id).then((res: any) => {
      setSelectedSheet(res);
    });
  }, []);

  if (!crypto) {
    return null;
  }

  return (
    <div className="relative top-0 z-[60] right-0 pointer-events-none">
      <button
        className={`pointer-events-auto bg-light-secondary border-2  border-light-accent border-r-0 absolute  w-10 h-10 rounded-l-full ${
          isVisible
            ? "rounded-full top-10 right-10 z-50"
            : "right-0 top-32 z-10"
        }`}
        onClick={() => setIsVisible(!isVisible)}
      />
      <div
        className={`absolute right-0 top-0 pointer-events-auto w-full transition-all duration-200 bg-white overflow-hidden ${
          isVisible
            ? "w-[60rem] h-full px-4 prose border-l-2 p-10 border-light-secondary flex flex-col"
            : "w-0 hidden h-0"
        }`}
      >
        <h2 className="uppercase text-3xl">Notes</h2>
        <MDXEditor
          onChange={(text) => {
            updateSheetWithId(
              selectedSheet.id,
              {
                ...selectedSheet.data,
                notes: text,
              },
              selectedSheet?.campaign,
              user?.id
            )
              .then((res: any) => {
                setSelectedSheet(res);
              })
              .catch(() => {
                toast.error("Can't save notes right now. Try again later.");
              });
          }}
          markdown={selectedSheet.data?.notes}
        />
      </div>
    </div>
  );
}
