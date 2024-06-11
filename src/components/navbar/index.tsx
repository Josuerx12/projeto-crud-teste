"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiLogoBlogger } from "react-icons/bi";
import {
  FaBars,
  FaSign,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
  FaUserPlus,
} from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdFeed, MdPreview } from "react-icons/md";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const router = useRouter();

  return (
    <div className="fixed w-full">
      <div className=" flex justify-between gap-3 items-center max-w-screen-xl mx-auto px-6 py-2 bg-neutral-400/60 shadow-md shadow-neutral-500 rounded m-4 ">
        <div className="text-3xl flex gap-2 items-center text-black/60 hover:text-black/80 duration-500 cursor-pointer">
          <h1 className="font-bold">JC Blog</h1>
          <BiLogoBlogger />
        </div>

        <ul className="md:flex gap-3 hidden">
          <li
            onClick={() => router.push("/feed")}
            className="flex gap-2 items-center text-lg hover:bg-black/60 hover:text-white duration-300 px-2 py-1 rounded-md cursor-pointer"
          >
            Feed <MdFeed />
          </li>
          <li
            onClick={() => router.push("/meusPosts")}
            className="flex gap-2 items-center text-lg hover:bg-black/60 hover:text-white duration-300 px-2 py-1 rounded-md cursor-pointer"
          >
            Meus Posts <MdPreview />
          </li>
          <li
            onClick={() => router.push("/perfil")}
            className="flex gap-2 items-center text-lg hover:bg-black/60 hover:text-white duration-300 px-2 py-1 rounded-md cursor-pointer"
          >
            Perfil <ImProfile />
          </li>
          <li
            onClick={() => router.push("/signIn")}
            className="flex gap-2 items-center text-lg hover:bg-black/60 hover:text-white duration-300 px-2 py-1 rounded-md cursor-pointer"
          >
            Login <FaSignInAlt />
          </li>
          <li
            onClick={() => router.push("/signUp")}
            className="flex gap-2 items-center text-lg hover:bg-black/60 hover:text-white duration-300 px-2 py-1 rounded-md cursor-pointer"
          >
            Cadastre-se <FaUserPlus />
          </li>
          <li className="flex gap-2 items-center text-lg hover:bg-black/60 hover:text-white duration-300 px-2 py-1 rounded-md cursor-pointer">
            Logout <FaSignOutAlt />
          </li>
        </ul>

        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className={`text-3xl md:hidden z-50`}
        >
          {isMobileOpen ? <FaTimes color="#fff" /> : <FaBars />}
        </button>
      </div>

      <ul
        className={`fixed w-full h-full flex justify-center flex-col items-center bg-neutral-700 z-40 ${
          isMobileOpen ? "top-0 " : "-top-full"
        } left-0 ease-linear duration-300 text-white `}
      >
        <li
          onClick={() => router.push("/feed")}
          className="flex gap-2 items-center text-lg hover:bg-black/60 hover:text-white duration-300 px-2 py-1 rounded-md cursor-pointer"
        >
          Feed <MdFeed />
        </li>
        <li
          onClick={() => router.push("/meusPosts")}
          className="flex gap-2 items-center text-lg hover:bg-black/60 hover:text-white duration-300 px-2 py-1 rounded-md cursor-pointer"
        >
          Meus Posts <MdPreview />
        </li>
        <li
          onClick={() => router.push("/perfil")}
          className="flex gap-2 items-center text-lg hover:bg-black/60 hover:text-white duration-300 px-2 py-1 rounded-md cursor-pointer"
        >
          Perfil <ImProfile />
        </li>
        <li
          onClick={() => router.push("/signIn")}
          className="flex gap-2 items-center text-lg hover:bg-black/60 hover:text-white duration-300 px-2 py-1 rounded-md cursor-pointer"
        >
          Login <FaSignInAlt />
        </li>
        <li className="flex gap-2 items-center text-lg hover:bg-black/60 hover:text-white duration-300 px-2 py-1 rounded-md cursor-pointer">
          Logout <FaSignOutAlt />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
