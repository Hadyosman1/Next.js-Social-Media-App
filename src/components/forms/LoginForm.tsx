"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLoginInputs, userLogInSchema } from "@/schemas/validationsSchemas";
import SmallLoadingIndicator from "../shared/SmallLoadingIndicator";
import { userLogin } from "@/services/auth";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm<TLoginInputs>({
    resolver: zodResolver(userLogInSchema),
    mode: "onBlur",
  });

  const submitHandler: SubmitHandler<TLoginInputs> = async (data) => {
    setIsLoading(true);
    const res = await userLogin(data);
    setIsLoading(false);

    if (!res.ok) return toast.error(res.error);

    router.replace("/");
    toast.success("logged in successfully");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-grow flex-col justify-center rounded border border-sky-400 px-4 py-8 shadow-md md:max-w-xl md:px-8"
    >
      <h2 className="mb-4 border-b border-sky-400 px-2 pb-3 text-center text-xl font-bold uppercase text-sky-500">
        Log in
      </h2>

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
        type="password"
        error={errors?.password?.message}
        placeholder="Enter your password"
        label="Password"
        name="password"
        register={register}
        isValid={!errors.password?.message && getFieldState("password").isDirty}
        validMessage="Valid password"
      />

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

export default LoginForm;
