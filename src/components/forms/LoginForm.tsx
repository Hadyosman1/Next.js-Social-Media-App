"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const router = useRouter();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (formState.email === "") {
      return toast.error("E-mail is required..!", { position: "top-center" });
    }
    if (formState.password === "") {
      return toast.error("Password is required..!", { position: "top-center" });
    }

    if (formState.password.length < 8 && formState.password.length > 0) {
      return toast.error("Password must be at least 8 digits..!", {
        position: "top-center",
      });
    }

    router.push("/");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex w-72 flex-col gap-1 rounded border border-sky-400 px-8 py-5 shadow-md"
    >
      <h2 className="-mx-8 mb-2 border-b border-sky-400 px-2 pb-3 text-center text-2xl font-bold uppercase text-sky-500">
        Login
      </h2>
      <div className="mb-4 mt-4">
        <label htmlFor="email">E-mail</label>
        <input
          className="border-b-2 p-1 focus:border-sky-700 focus:outline-none"
          type="email"
          id="email"
          placeholder="example@example.com"
          value={formState.email}
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          className="border-b-2 p-1 px-3 focus:border-sky-700 focus:outline-none"
          type="password"
          id="password"
          placeholder="enter your password"
          value={formState.password}
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />
      </div>

      <button
        className="mt-3 w-full rounded bg-blue-600 px-10 py-2 text-white hover:bg-blue-700"
        type="submit"
      >
        submit
      </button>
    </form>
  );
};

export default LoginForm;
