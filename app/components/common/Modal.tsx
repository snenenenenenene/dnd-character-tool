import React from "react";

interface ModalArgs {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Modal = ({ showModal, setShowModal, children }: ModalArgs) => {
  //TODO: CREATE A UNIFIED MODAL COMPONENT
  return (
    <>
      {showModal && (
        <div
          className="w-screen  z-50 flex justify-center items-center h-screen absolute inset-0 bg-[#00000060]"
          typeof="button"
          data-value="parent"
          onClick={(e: any) => {
            e.preventDefault();
            let dataValue = (e.target as HTMLElement).getAttribute(
              "data-value"
            );
            if (dataValue === "parent") {
              setShowModal(false);
            }
          }}
        >
          <div
            data-value="child"
            className="w-1/2 h-3/4 min-w-[500px] flex flex-col bg-light-primary text-light-secondary border-2 border-light-secondary dark:bg-dark-primary dark:border-dark-secondary dark:text-dark-secondary"
          >
            <section className="w-full h-10 border-b-2 border-light-secondary dark:border-dark-secondary">
              {" "}
            </section>
            <section className="flex flex-col justify-center w-full h-full gap-8 items-center">
              {children}
            </section>
          </div>
        </div>
      )}
    </>
  );
};
