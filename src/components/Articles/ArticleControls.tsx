"use client";

import { useCallback, useState } from "react";
import { DropDown } from "../shared/DropDown";
import ToolTipItem from "../shared/ToolTipItem";
import DeleteItemModal from "../Modals/DeleteItemModal";

import { BsThreeDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";

const ArticleControls = ({ articleId }: { articleId: number }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onModalClose = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const closeDropDown = useCallback(() => {
    setIsDropDownOpen(false);
  }, []);

  return (
    <>
      <div className="relative ms-auto self-start">
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

      {isDeleteModalOpen && (
        <DeleteItemModal
          item="article"
          isModalOpen={isDeleteModalOpen}
          onClose={onModalClose}
          articleId={articleId}
        />
      )}
    </>
  );
};

export default ArticleControls;
