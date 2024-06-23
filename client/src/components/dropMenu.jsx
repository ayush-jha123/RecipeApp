import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../redux/user/userSlice";

const dropMenu = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signout());
  };
  return (
    <div className="bg-white w-[12rem] h-[14rem] absolute top-16 right-10 flex justify-start p-2 rounded-md">
      <div className="bg-white w-[1.5rem] h-[1.5rem] absolute rotate-45 right-6 bottom-[13.3rem] "></div>
      <ul>
        <Link to="/">
          <li className="text-[1.3rem] font-serif mt-2 p-1 pl-4 w-[11rem] text-start hover:bg-slate-200">
            Home
          </li>
        </Link>
        <Link to="/userProfile">
          <li className="text-[1.3rem] font-serif mt-2 p-1 pl-4 w-[11rem] text-start hover:bg-slate-200">
            Profile
          </li>
        </Link>
        <Link to="/recipes">
          <li className="text-[1.3rem] font-serif mt-2 p-1 pl-4 w-[11rem] text-start hover:bg-slate-200">
            Recipes
          </li>
        </Link>
        <button onClick={handleLogout}>
          <li className="text-[1.3rem] font-serif mt-2 p-1 pl-4 w-[11rem] text-start hover:bg-slate-200">
            LogOut
          </li>
        </button>
      </ul>
    </div>
  );
};

export default dropMenu;
