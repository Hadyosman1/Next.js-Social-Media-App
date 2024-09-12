"use client";

import { useCallback } from "react";
import ModalWrapper from "./ModalWrapper";
import ArticleForm from "../forms/ArticleForm";
import { TArticleInputs } from "@/schemas/validationsSchemas";

type TProps = {
  status: "edit" | "create";
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  articleId?: number;
  prevDataToEdit?: TArticleInputs;
  imageUrl?: string | null;
};

const ArticleModal = ({
  setIsModalOpen,
  isModalOpen,
  status,
  articleId,
  prevDataToEdit,
  imageUrl,
}: TProps) => {
  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <ModalWrapper
      className="shadow shadow-blue-500"
      title={`${status} Article`}
      bg="white"
      onClose={onClose}
      isOpen={isModalOpen}
    >
      <ArticleForm
        imageUrl={imageUrl ?? null}
        prevDataToEdit={prevDataToEdit}
        articleId={articleId}
        status={status}
        onClose={onClose}
      />
    </ModalWrapper>
  );
};

export default ArticleModal;
