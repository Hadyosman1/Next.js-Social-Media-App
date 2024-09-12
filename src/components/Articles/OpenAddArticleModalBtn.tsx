"use client";

import { useState } from "react";
import ArticleModal from "../modals/ArticleModal";

//icons
import { MdPostAdd } from "react-icons/md";
import ToolTipItem from "../shared/ToolTipItem";

const OpenAddArticleModalBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <ArticleModal
        status="create"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default OpenAddArticleModalBtn;