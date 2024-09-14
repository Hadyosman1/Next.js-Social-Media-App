"use client";

import {
  createArticleSchema,
  TArticleInputs,
} from "@/schemas/validationsSchemas";
import { createArticle, updateArticle } from "@/services/articles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SmallLoadingIndicator from "../shared/SmallLoadingIndicator";
import FileInput from "./FileInput";
import { useRouter } from "next/navigation";
import DisplayUploadedImage from "./DisplayUploadedImage";
import Image from "next/image";

const ArticleForm = ({
  onClose,
  status,
  prevDataToEdit,
  articleId,
  imageUrl,
  title,
}: {
  onClose?: () => void;
  status: "create" | "edit";
  prevDataToEdit?: TArticleInputs;
  articleId?: number;
  imageUrl?: string | null;
  title?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TArticleInputs>({
    resolver: zodResolver(createArticleSchema),
  });

  const operation = status === "create" ? createArticle : updateArticle;

  const onSubmit: SubmitHandler<TArticleInputs> = async (data) => {
    setIsLoading(true);
    const res = await operation({
      ...data,
      image,
      id: status === "edit" && articleId ? articleId : 0,
    });
    setIsLoading(false);

    if (!res.ok) {
      return toast.error(res.error, {
        position: "bottom-center",
      });
    }

    toast.success(res.message, {
      position: "bottom-center",
    });

    // close modal
    onClose?.();
    setImage(null);
    reset();
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-xl flex-col gap-2 overflow-y-auto rounded bg-white px-4 py-8 md:px-8"
    >
      {title && (
        <h3 className="border-b border-blue-400 pb-3 text-center text-xl font-semibold text-blue-400">
          {title}
        </h3>
      )}

      <label htmlFor="title">Title</label>
      <textarea
        dir="auto"
        defaultValue={prevDataToEdit && prevDataToEdit.title}
        placeholder="Enter article title"
        {...register("title")}
        id="title"
        className={`${errors.title?.message ? "ring-red-500 focus:ring-red-600" : "ring-blue-300 focus:ring-blue-400"} h-9 max-h-40 min-h-9 resize-y overflow-y-auto rounded bg-slate-50 p-1 ring-2 focus:bg-slate-100 focus:outline-none`}
      />

      {errors.title?.message && (
        <p className="text-sm text-red-500">{errors.title?.message}</p>
      )}

      <label htmlFor="description">Description</label>
      <textarea
        dir="auto"
        defaultValue={prevDataToEdit && prevDataToEdit.description}
        placeholder="Enter article description"
        {...register("description")}
        id="description"
        className={`${errors.title?.message ? "ring-red-500 focus:ring-red-600" : "ring-blue-300 focus:ring-blue-400"} h-16 max-h-52 min-h-16 resize-y overflow-y-auto rounded bg-slate-50 p-1 ring-2 ring-blue-300 focus:bg-slate-100 focus:outline-none focus:ring-blue-400`}
      />

      {errors.description?.message && (
        <p className="text-sm text-red-500">{errors.description?.message}</p>
      )}

      <FileInput
        fileName={image?.name}
        label="Article image (optional)"
        setter={setImage}
      />

      {image && <DisplayUploadedImage image={image} />}

      {imageUrl && !image && (
        <div className="my-2">
          <Image
            src={imageUrl ?? ""}
            alt={prevDataToEdit?.title ?? "article image"}
            width={800}
            height={600}
            className="h-auto max-h-[600px] w-full rounded bg-slate-100/50 object-contain"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 flex items-center justify-center gap-2 rounded bg-blue-600 py-1 capitalize text-white hover:bg-blue-700"
      >
        {isLoading && <SmallLoadingIndicator />} {status} Article
      </button>
    </form>
  );
};

export default ArticleForm;
