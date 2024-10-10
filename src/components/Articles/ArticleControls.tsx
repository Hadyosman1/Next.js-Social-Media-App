"use client";

import { useCallback, useState } from "react";
import { DropDown } from "../shared/DropDown";
import ToolTipItem from "../shared/ToolTipItem";

import DeleteArticleBtn from "./DeleteArticleBtn";

import { BsThreeDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import EditArticleBtn from "./EditArticleBtn";

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

  const closeDropDown = useCallback(() => {
    setIsDropDownOpen(false);
  }, []);

  return (
    <>
      <div className="relative me-1 ms-auto self-start">
        <button
          onClick={() => setIsDropDownOpen((prev) => !prev)}
          className="tooltip_wrapper flex items-center justify-center rounded-md bg-slate-100 px-3 py-1.5 text-xl text-slate-500 hover:bg-slate-200"
        >
          <span className="sr-only">Settings</span>
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
          <EditArticleBtn
            articleId={articleId}
            imageUrl={imageUrl}
            title={title}
            description={description}
          />

          <DeleteArticleBtn articleId={articleId} />
        </DropDown>
      </div>
    </>
  );
};

export default ArticleControls;
