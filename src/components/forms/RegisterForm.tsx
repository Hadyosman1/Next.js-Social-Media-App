"use client";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (formState.email === "")
      toast.error("E-mail is required..!", { position: "top-center" });
    if (formState.password === "")
      toast.error("Password is required..!", { position: "top-center" });

    if (formState.userName === "")
      toast.error("User name is required..!", { position: "top-center" });

    if (formState.password.length < 8 && formState.password.length > 0)
      toast.error("Password must be at least 8 digits..!", {
        position: "top-center",
      });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex w-72 flex-col rounded border border-sky-400 px-8 py-5 shadow-md"
    >
      <h2 className="-mx-8 mb-2 border-b border-sky-400 px-2 pb-3 text-center text-2xl font-bold uppercase text-sky-500">
        Create Account
      </h2>

      <div className="mb-4 mt-4">
        <label htmlFor="userName">User name</label>
        <input
          className="border-b-2 px-3 py-1 focus:border-sky-700 focus:outline-none"
          type="text"
          id="userName"
          placeholder="John Doe"
          value={formState.userName}
          onChange={(e) =>
            setFormState({ ...formState, userName: e.target.value })
          }
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email">E-mail</label>
        <input
          className="border-b-2 px-3 py-1 focus:border-sky-700 focus:outline-none"
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
          className="border-b-2 px-3 py-1 focus:border-sky-700 focus:outline-none"
          type="password"
          id="password"
          placeholder="Enter your password"
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

export default RegisterForm;
