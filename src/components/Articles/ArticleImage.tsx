"use client";

import ModalWrapper from "../Modals/ModalWrapper";
import { useCallback, useState } from "react";
import Image from "next/image";

const ArticleImage = ({
  image,
  title,
}: {
  image: string | null;
  title: string;
}) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const onClose = useCallback(() => setIsImageModalOpen(false), []);

  if (!image) return null;

  return (
    <>
      <Image
        className="h-auto max-h-[650px] w-full cursor-pointer rounded bg-slate-100/50 object-contain"
        src={image}
        alt={title}
        width={800}
        height={650}
        onClick={() => setIsImageModalOpen(true)}
      />

      {isImageModalOpen && (
        <ModalWrapper isOpen={isImageModalOpen} onClose={onClose} size="lg">
          <div className="overflow-y-auto">
            <Image
              className="h-auto max-h-[650px] w-full rounded bg-slate-100/50 object-contain"
              src={image}
              alt={title}
              width={1000}
              height={800}
            />
          </div>{" "}
        </ModalWrapper>
      )}
    </>
  );
};

export default ArticleImage;
