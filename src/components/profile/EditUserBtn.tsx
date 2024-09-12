"use client";

import { useCallback, useState } from "react";
import { FaGear } from "react-icons/fa6";
import ModalWrapper from "../modals/ModalWrapper";
import RegisterOrEditForm from "../forms/RegisterOrEditForm";
import { User } from "@prisma/client";

const EditUserBtn = ({ user }: { user: User }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 focus:outline-none"
      >
        <FaGear /> Edit
      </button>

      {isModalOpen && (
        <ModalWrapper
          bg="slate-100"
          title="Edit account"
          onClose={onClose}
          isOpen={isModalOpen}
          size="md"
        >
          <RegisterOrEditForm
            closeModal={onClose}
            oldData={user}
            status="edit"
          />
        </ModalWrapper>
      )}
    </>
  );
};

export default EditUserBtn;
