import React from "react";
import { Link, Outlet } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import { useSelector } from "react-redux";
import UserMenuItems from "./UserMenuItems";

const Navbar = () => {
  const {user} = useSelector((state) => state.userReducer);
  return (
    <>
      <div className="fixed shadow-sm shadow-white-10 w-full z-10 top-0 flex justify-between items-center bg-slate-50 dark:bg-zinc-800
        dark:shadow-sm dark:shadow-zinc-900 py-3 px-10">
        <div>
          {/* Logo */}
          <div className="font-bold text-3xl text-center 
            tablloet:text-lg lg:text-3xl xl:text-4xl">
            <i className="fa-solid fa-baht-sign fixed left-0 ml-1 lg:invisible"></i>
            <Link to="/" className="linkStyle">
              {" "}
              Muzicer{" "}
            </Link>
          </div>
        </div>

        <div className="flex items-center">
            <span className="text-2xl lg:text-base xl:text-2xl mr-5 pt-1">
              {" "}
              <ThemeSwitch />{" "}
            </span>
            {user?<UserMenuItems /> :null}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
