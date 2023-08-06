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

  return (
    <div className="absolute top-o z-[60] right-0 w-[95.8%] h-full pointer-events-none">
      <button
        className={`pointer-events-auto bg-light-secondary border-2  border-light-accent border-r-0 absolute  w-10 h-10 rounded-l-full ${
          isVisible
            ? "rounded-full top-10 right-10 z-50"
            : "right-48 top-32 z-10"
        }`}
        onClick={() => setIsVisible(!isVisible)}
      ></button>
      <div
        className={`pointer-events-auto transition-all duration-200 absolute bg-light-primary right-0 bottom-0  overflow-hidden ${
          isVisible
            ? "w-full h-full px-4 border-l-2 p-10 border-light-secondary flex flex-col"
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
