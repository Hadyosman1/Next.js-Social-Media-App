"use client";

import { useCallback, useState } from "react";
import { DropDown } from "../shared/DropDown";
import ToolTipItem from "../shared/ToolTipItem";
import DeleteItemModal from "../modals/DeleteItemModal";

import { BsThreeDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";
import ArticleModal from "../modals/ArticleModal";

const ArticleControls = ({
  articleId,
  imageUrl,
  title,
  description,
}: {
  articleId: number;
  imageUrl: string | null;
  title: string;
  description: string;
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const onDeleteModalClose = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const closeDropDown = useCallback(() => {
    setIsDropDownOpen(false);
  }, []);

  return (
    <>
      <div className="relative ms-auto self-start me-1">
        <button
          onClick={() => setIsDropDownOpen((prev) => !prev)}
          className="tooltip_wrapper flex items-center justify-center rounded-md bg-slate-100 px-3 py-1.5 text-xl text-slate-500 hover:bg-slate-200"
        >
          {isDropDownOpen ? (
            <IoClose />
          ) : (
            <>
              <BsThreeDots />
              <ToolTipItem position="bottom-center">Settings</ToolTipItem>
            </>
          )}
        </button>

        <DropDown
          size="sm"
          isOpen={isDropDownOpen}
          closeDropDown={closeDropDown}
          position="bottom-left"
        >
          <button
            onClick={() => setIsEditModalOpen(true)}
            className={`flex items-center justify-between gap-0.5 rounded-sm bg-blue-600/80 px-3 py-1 text-slate-100 transition-all hover:bg-blue-700/80`}
          >
            Edit
            <BiEditAlt />
          </button>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className={`flex items-center justify-between gap-0.5 rounded-sm bg-red-700/80 px-3 py-1 text-slate-100 transition-all hover:bg-red-800/80`}
          >
            Delete
            <BiTrashAlt />
          </button>
        </DropDown>
      </div>

      {isEditModalOpen && (
        <ArticleModal
          prevDataToEdit={{ title, description }}
          imageUrl={imageUrl}
          articleId={articleId}
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          status="edit"
        />
      )}

      {isDeleteModalOpen && (
        <DeleteItemModal
          item="article"
          isModalOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          articleId={articleId}
        />
      )}
    </>
  );
};

export default ArticleControls;
