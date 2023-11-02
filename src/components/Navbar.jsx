import React from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

const Navbar = ({ username }) => {
  const navigate = useNavigate();
  return (
    <nav className="w-screen overflow-hidden z-10 bg-white fixed shadow-sm ">
      <div className="mx-24 flex justify-between items-center px-4 py-4">
        <div className="flex gap-x-4 text-[#0E0E44]">
          <img src="./src/assets/LOGO.png" width={150} className="cursor-pointer" onClick={() => navigate("/")} />
        </div>
        <div>
          {username ? (
            <div className="flex gap-x-2 items-center cursor-pointer font-semibold">
              Welcome Back, {username}
              <UserIcon className="w-5 h-5 inline-block border border-[#0E0E44] rounded-full" />
            </div>
          ) : (
            <Button label="Log In" onClick={() => navigate("/shopwise/auth/login")} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
