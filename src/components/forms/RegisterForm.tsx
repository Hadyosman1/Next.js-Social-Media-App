"use client";
import { useState } from "react";
import {
  createUserSchema,
  TRegisterInputs,
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

const RegisterForm = () => {
  const [file, setFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm<TRegisterInputs>({
    resolver: zodResolver(createUserSchema),
    mode: "onBlur",
  });

  const submitHandler: SubmitHandler<TRegisterInputs> = async (data) => {
    setIsLoading(true);
    const res = await userRegister({ ...data, profilePicture: file });
    setIsLoading(false);

    if (!res.ok) return toast.error(res.error);

    toast.success("Account created successfully");
    router.replace("/");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-grow flex-col justify-center rounded border border-sky-400 px-4 py-8 shadow-md md:max-w-xl md:px-8"
    >
      <h2 className="mb-4 border-b border-sky-400 px-2 pb-3 text-center text-xl font-bold uppercase text-sky-500">
        Create Account
      </h2>

      <FormInput
        error={errors.userName?.message}
        placeholder="John Doe"
        label="User name"
        name="userName"
        register={register}
        isValid={!errors.userName?.message && getFieldState("userName").isDirty}
        validMessage="Valid user name"
      />

      <FormInput
        error={errors.email?.message}
        placeholder="example@example.com"
        label=" E-mail"
        name="email"
        register={register}
        isValid={!errors.email?.message && getFieldState("email").isDirty}
        validMessage="Valid email address"
      />

      <FormInput
        error={errors?.password?.message}
        placeholder="Enter your password"
        label="Password"
        name="password"
        register={register}
        isValid={!errors.password?.message && getFieldState("password").isDirty}
        validMessage="Valid password"
      />

      <FileInput
        fileName={file?.name}
        label="Profile picture (optional)"
        setter={setFile}
      />

      <DisplayUploadedImage image={file} />

      <button
        disabled={isLoading}
        className={`${isLoading && "opacity-70"} mt-6 flex w-full items-center justify-center gap-2 rounded bg-blue-500 px-10 py-2 text-white hover:bg-blue-600`}
        type="submit"
      >
        {isLoading && <SmallLoadingIndicator />} Submit
      </button>
    </form>
  );
};

export default RegisterForm;
