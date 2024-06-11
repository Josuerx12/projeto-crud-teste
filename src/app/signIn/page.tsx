"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };
  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <h2 className="text-3xl font-bold py-6">Autentique-se</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 bg-neutral-700/30 shadow-md shadow-neutral-700/30 rounded-md max-w-screen-sm w-full"
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label className=" flex flex-col gap-2">
          <span className="font-semibold text-neutral-700">email</span>
          <input
            type="email"
            className="flex-grow h-8 rounded-sm"
            name="email"
            onChange={({ target }) => setEmail(target.value)}
            required
          />
        </label>

        <label className=" flex flex-col gap-2 ">
          <span className="font-semibold text-neutral-700">senha</span>
          <div className="flex gap-2 justify-center items-center">
            <input
              type="password"
              className="flex-grow h-8 rounded-sm"
              onChange={({ target }) => setPassword(target.value)}
              name="password"
              min={6}
              required
            />
            <div className="bg-white h-8 px-2 items-center justify-center flex rounded-sm cursor-pointer hover:bg-black/10 duration-300">
              <FaEye size={23} />
            </div>
          </div>
        </label>

        <button
          type="submit"
          className="bg-black/60 hover:bg-black/50 duration-200 h-8 rounded-sm text-white text-lg"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Login;
