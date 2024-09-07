"use client";

import { useCallback, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import AddArticleForm from "../forms/AddArticleForm";

//icons
import { MdPostAdd } from "react-icons/md";
import ToolTipItem from "../shared/ToolTipItem";

const AddArticleModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="add_article_btn tooltip_wrapper"
      >
        <span className="p-2 text-2xl text-blue-600">
          <MdPostAdd />
        </span>

        <ToolTipItem position="top-center">Add Article</ToolTipItem>
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
