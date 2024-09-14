import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import ArticleModal from "../modals/ArticleModal";

const EditArticleBtn = ({
  title,
  description,
  imageUrl,
  articleId
}: {
  articleId: number;
  title: string;
  description: string;
  imageUrl: string | null;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsEditModalOpen(true)}
        className={`flex items-center justify-between gap-0.5 rounded-sm bg-blue-600/80 px-3 py-1 text-slate-100 transition-all hover:bg-blue-700/80`}
      >
        Edit
        <BiEditAlt />
      </button>

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
    </>
  );
};

export default EditArticleBtn;
