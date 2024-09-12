"use client";

import ChangeUserPictureModal from "../modals/ChangeUserPictureModal";

//icons
import { FcEditImage } from "react-icons/fc";
import { useCallback, useState } from "react";

const ChangeProfilePictureBtn = ({ id }: { id: number }) => {
  const [isUserPictureModalOpen, setIsUserPictureImageOpen] = useState(false);

  const closeChangePictureModal = useCallback(() => {
    setIsUserPictureImageOpen(false);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsUserPictureImageOpen(true)}
        className="tooltip_wrapper absolute bottom-0 right-0 -translate-x-full  rounded-full bg-slate-200 p-2 text-2xl shadow-md hover:bg-slate-300"
      >
        <FcEditImage />
        <span className="tooltip tooltip_center_top whitespace-nowrap text-sm">
          Change picture
        </span>
      </button>

      {isUserPictureModalOpen && (
        <ChangeUserPictureModal
          userId={id}
          isOpen={isUserPictureModalOpen}
          onClose={closeChangePictureModal}
        />
      )}
    </>
  );
};

export default ChangeProfilePictureBtn;
