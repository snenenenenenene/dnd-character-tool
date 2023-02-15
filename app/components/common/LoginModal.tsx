/* eslint-disable no-unused-vars */
import React, { useState } from "react";

export const LoginModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };
  return (
    <div
      onClick={() => toggleModal()}
      className="absolute w-screen h-screen inset-0 bg-[#00000033]"
    >
      LoginModal
    </div>
  );
};
