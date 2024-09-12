"use client";

import { useRouter } from "next/navigation";
import DisplayUploadedImage from "../forms/DisplayUploadedImage";
import FileInput from "../forms/FileInput";
import SmallLoadingIndicator from "../shared/SmallLoadingIndicator";
import ModalWrapper from "./ModalWrapper";
import { FormEvent, useState } from "react";
import { updateUser } from "@/services/users";
import { toast } from "react-toastify";

const ChangeUserPictureModal = ({
  onClose,
  isOpen,
  userId,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const handleFormSubmitted = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const res = await updateUser({ id: userId, profilePicture: image });
    setIsLoading(false);

    if (!res.ok) {
      return toast.error(res.error, {
        position: "bottom-center",
      });
    }

    toast.success(res.message, {
      position: "bottom-center",
    });

    router.refresh();
    onClose();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      bg="white"
      size="sm"
      title="Change Profile Picture"
    >
      <form
        onSubmit={handleFormSubmitted}
        className="flex flex-col gap-2 overflow-y-auto rounded bg-white px-4 py-8 md:px-8"
      >
        <FileInput
          fileName={image?.name}
          label="profile picture"
          setter={setImage}
        />

        {image && <DisplayUploadedImage image={image} />}

        <button
          type="submit"
          disabled={isLoading || !image}
          className="mt-4 flex items-center justify-center gap-2 rounded bg-blue-600 py-1 capitalize text-white hover:bg-blue-700"
        >
          {isLoading && <SmallLoadingIndicator />} Submit
        </button>
      </form>
    </ModalWrapper>
  );
};

export default ChangeUserPictureModal;
