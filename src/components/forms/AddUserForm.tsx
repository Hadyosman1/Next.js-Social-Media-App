"use client";

import React, { useState } from "react";
import SmallLoadingIndicator from "../shared/SmallLoadingIndicator";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import FileInput from "./FileInput";
import DisplayUploadedImage from "./DisplayUploadedImage";
import {
  TRegisterInputs,
  createUserSchema,
} from "@/schemas/validationsSchemas";

import { FaCheck } from "react-icons/fa";
import { userRegister } from "@/services/auth";
import { toast } from "react-toastify";

const AddUserForm = () => {
  const [file, setFile] = useState<File | null>(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm<TRegisterInputs>({
    resolver: zodResolver(createUserSchema),
    mode: "onSubmit",
  });

  const submitHandler: SubmitHandler<TRegisterInputs> = async (data) => {
    setIsLoading(true);
    const res = await userRegister({ ...data, profilePicture: file, isAdmin });
    setIsLoading(false);

    if (!res.ok) return toast.error(res.error);

    toast.success(`Account created successfully`);

    router.push("/dashboard/users");

    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-grow flex-col justify-center overflow-y-auto rounded border border-sky-400 px-4 py-8 shadow-md md:max-w-xl md:px-8"
    >
      <h2 className="mb-3 border-b border-blue-400 pb-3 text-center text-2xl font-semibold text-sky-500">
        Add User
      </h2>

      <FormInput
        autoFocus
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
        label="E-mail"
        name="email"
        register={register}
        isValid={!errors.email?.message && getFieldState("email").isDirty}
        validMessage="Valid email address"
      />

      <FormInput
        type="password"
        error={errors?.password?.message}
        placeholder="Enter your password"
        label="Password"
        name="password"
        register={register}
        isValid={!errors.password?.message && getFieldState("password").isDirty}
        validMessage="Valid password"
      />

      <div className="my-2 flex items-center bg-white px-3 py-2">
        <label
          className="flex cursor-pointer items-center gap-1.5"
          htmlFor="isAdmin"
        >
          <span className="relative h-5 w-5">
            <input
              className="absolute inset-0 cursor-pointer appearance-none rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              checked={isAdmin}
              onChange={() => setIsAdmin((prev) => !prev)}
              type="checkbox"
              name="is Admin"
              id="isAdmin"
            />

            <span
              className={`absolute inset-0 flex items-center justify-center rounded border-[2px] border-sky-400 ${isAdmin ? "bg-sky-400 ring-2 ring-sky-500" : "bg-sky-300/60 opacity-70 hover:opacity-100"}`}
            >
              <FaCheck
                className={`w-[65%] ${isAdmin ? "text-white" : "text-gray-100"}`}
              />
            </span>
          </span>
          <span>Is Admin</span>
        </label>
      </div>

      <FileInput
        fileName={file?.name}
        label="Profile picture (optional)"
        setter={setFile}
      />

      {file && <DisplayUploadedImage image={file} />}

      <button
        disabled={isLoading}
        className={`${isLoading && "opacity-70"} mt-6 flex w-full items-center justify-center gap-2 rounded bg-blue-500 px-10 py-2 text-white hover:bg-blue-600`}
        type="submit"
      >
        {isLoading && <SmallLoadingIndicator />}
        Submit
      </button>
    </form>
  );
};

export default AddUserForm;
