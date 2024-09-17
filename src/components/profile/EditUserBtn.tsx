"use client";

import { useCallback, useState } from "react";
import { FaGear } from "react-icons/fa6";
import ModalWrapper from "../Modals/ModalWrapper";
import RegisterOrEditForm from "../forms/RegisterOrEditForm";
import { TypeJWTPayload } from "@/types";

const EditUserBtn = ({ user }: { user: TypeJWTPayload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-1 rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600 focus:outline-none"
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
