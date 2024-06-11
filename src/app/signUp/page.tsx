"use client";

import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

import { useForm } from "react-hook-form";
import axios, { ResponseType } from "axios";
import { useRouter } from "next/navigation";
export type RegisterUserCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const SignUp = () => {
  const navitage = useRouter();
  const { register, handleSubmit } = useForm<RegisterUserCredentials>();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  async function handleRegister(credentials: RegisterUserCredentials) {
    setIsLoading(true);

    try {
      await axios.post("/api/register", credentials);
      navitage.push("/signIn");
    } catch (error: any) {
      setErrors(error.response.data.errors);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <h2 className="text-3xl font-bold py-6">Cadastre-se</h2>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col gap-4 p-4 bg-neutral-700/30 shadow-md shadow-neutral-700/30 rounded-md max-w-screen-sm w-full"
      >
        <label className=" flex flex-col gap-2">
          <span>nome</span>
          <input
            {...register("firstName")}
            type="text"
            className="flex-grow h-8 rounded-sm"
            name="firstName"
            min={3}
            required
          />
        </label>

        <label className=" flex flex-col gap-2">
          <span>sobrenome</span>
          <input
            {...register("lastName")}
            type="text"
            className="flex-grow h-8 rounded-sm"
            name="lastName"
            min={3}
            required
          />
        </label>

        <label className=" flex flex-col gap-2">
          <span>email</span>
          <input
            {...register("email")}
            type="email"
            className="flex-grow h-8 rounded-sm"
            name="email"
            required
          />
        </label>

        <label className=" flex flex-col gap-2 ">
          <span>senha</span>
          <div className="flex gap-2 justify-center items-center">
            <input
              {...register("password")}
              type="password"
              className="flex-grow h-8 rounded-sm"
              name="password"
              min={6}
              required
            />
            <div className="bg-white h-8 px-2 items-center justify-center flex rounded-sm">
              <FaEye size={23} />
            </div>
          </div>
        </label>

        <label className=" flex flex-col gap-2 ">
          <span>confirmar senha</span>
          <div className="flex gap-2 w-full justify-center items-center">
            <input
              {...register("confirmPassword")}
              type="password"
              className="flex-grow h-8 rounded-sm"
              name="confirmPassword"
              min={6}
              required
            />
            <div className="bg-white h-8 px-2 items-center justify-center flex rounded-sm">
              <FaEye size={23} />
            </div>
          </div>
        </label>
        <button
          type="submit"
          className="bg-black/60 hover:bg-black/50 duration-200 h-8 rounded-sm text-white text-lg"
        >
          {isLoading ? <>Cadastrando..</> : <>Cadastrar</>}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
