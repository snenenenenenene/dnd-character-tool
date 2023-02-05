/* eslint-disable no-unused-vars */
import React, { useState } from "react";

export const LoginModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };
  return (
    <div onClick={() => toggleModal} className="">
      LoginModal
    </div>
  );
};
