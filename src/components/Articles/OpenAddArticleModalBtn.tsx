"use client";

import React, { useState } from "react";
import ArticleModal from "../Modals/ArticleModal";

//icons
import { MdPostAdd } from "react-icons/md";
import ToolTipItem from "../shared/ToolTipItem";
import { usePathname } from "next/navigation";

const OpenAddArticleModalBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="add_article_btn tooltip_wrapper"
      >
        <span className="p-2 text-2xl text-blue-400">
          <MdPostAdd />
        </span>

        <span className="sr-only">Add Article</span>
        <ToolTipItem position="top-center">Add Article</ToolTipItem>
      </button>

      <ArticleModal
        status="create"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default OpenAddArticleModalBtn;
