"use client";
import { useState } from "react";
import {
  createUserSchema,
  TRegisterInputs,
  userUpdateSchema,
} from "@/schemas/validationsSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "./FormInput";

import { toast } from "react-toastify";
import { userRegister } from "@/services/auth";
import SmallLoadingIndicator from "../shared/SmallLoadingIndicator";
import FileInput from "./FileInput";
import { useRouter } from "next/navigation";
import DisplayUploadedImage from "./DisplayUploadedImage";
import Image from "next/image";
import { updateUser } from "@/services/users";

type TProps = {
  status: "register" | "edit";
  oldData?: {
    id: number;
    userName: string;
    email: string;
    profilePicture: null | string;
  };
  closeModal?: () => void;
};

const RegisterOrEditForm = ({ status, oldData, closeModal }: TProps) => {
  const [file, setFile] = useState<File | null>(null);

  const [isPassInputShown, setIsPassInputShown] = useState(
    status === "register",
  );

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const schema = status === "register" ? createUserSchema : userUpdateSchema;

  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm<TRegisterInputs>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const submitHandler: SubmitHandler<TRegisterInputs> = async (data) => {
    setIsLoading(true);

    let res;

    if (status === "register") {
      res = await userRegister({ ...data, profilePicture: file });
    } else {
      res = await updateUser({
        id: oldData?.id ?? 0,
        ...data,
        profilePicture: file,
      });
    }

    setIsLoading(false);

    if (!res.ok) return toast.error(res.error);

    toast.success(
      `Account ${status === "register" ? "created" : "updated"} successfully`,
    );

    if (status === "register") router.replace("/");

    if (closeModal) closeModal();

    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-grow flex-col justify-center overflow-y-auto rounded border border-sky-400 px-4 py-8 shadow-md md:max-w-xl md:px-8"
    >
      {status === "register" && (
        <h2 className="mb-4 border-b border-sky-400 px-2 pb-3 text-center text-xl font-bold uppercase text-sky-500">
          Create Account
        </h2>
      )}

      <FormInput
        autoFocus
        defaultValue={oldData?.userName}
        error={errors.userName?.message}
        placeholder="John Doe"
        label="User name"
        name="userName"
        register={register}
        isValid={!errors.userName?.message && getFieldState("userName").isDirty}
        validMessage="Valid user name"
      />

      <FormInput
        defaultValue={oldData?.email}
        error={errors.email?.message}
        placeholder="example@example.com"
        label="E-mail"
        name="email"
        register={register}
        isValid={!errors.email?.message && getFieldState("email").isDirty}
        validMessage="Valid email address"
      />

      {status === "edit" && (
        <button
          type="button"
          onClick={() => setIsPassInputShown((prev) => !prev)}
          className="my-3 flex items-center gap-1 self-start rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 focus:outline-none"
        >
          {!isPassInputShown ? "Edit" : "Keep"} password
        </button>
      )}

      {isPassInputShown && (
        <FormInput
          type="password"
          error={errors?.password?.message}
          placeholder={
            status === "edit" ? "Enter new password" : "Enter your password"
          }
          label={status === "edit" ? "New Password" : "Password"}
          name="password"
          register={register}
          isValid={
            !errors.password?.message && getFieldState("password").isDirty
          }
          validMessage="Valid password"
        />
      )}

      <FileInput
        fileName={file?.name}
        label="Profile picture (optional)"
        setter={setFile}
      />

      {file && <DisplayUploadedImage image={file} />}

      {oldData?.profilePicture && !file && (
        <div className="my-2">
          <Image
            src={oldData.profilePicture}
            alt={oldData.userName}
            width={800}
            height={600}
            className="h-auto max-h-[600px] w-full rounded bg-slate-100/50 object-contain"
          />
        </div>
      )}

      <button
        disabled={isLoading}
        className={`${isLoading && "opacity-70"} mt-6 flex w-full items-center justify-center gap-2 rounded bg-blue-500 px-10 py-2 text-white hover:bg-blue-600`}
        type="submit"
      >
        {isLoading && <SmallLoadingIndicator />}
        {status === "register" ? "Submit" : "Confirm"}
      </button>
    </form>
  );
};

export default RegisterOrEditForm;
