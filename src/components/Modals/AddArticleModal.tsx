"use client";

import { useCallback, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import AddArticleForm from "../forms/AddArticleForm";

//icons
import { MdPostAdd } from "react-icons/md";

const AddArticleModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="add_article_btn">
        <span className="p-2 text-2xl text-blue-600">
          <MdPostAdd />
        </span>
        <span className="tooltip_center_top">Add Article</span>
      </button>

      <ModalWrapper
        className="shadow shadow-blue-500"
        title="Create Article"
        bg="white"
        onClose={onClose}
        isOpen={isModalOpen}
      >
        <AddArticleForm onClose={onClose} />
      </ModalWrapper>
    </>
  );
};

export default AddArticleModal;
