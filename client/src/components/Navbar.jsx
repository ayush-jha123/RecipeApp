import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../redux/user/userSlice";
import DropMenu from "./dropMenu";
import { RxAvatar } from "react-icons/rx";
import logo from "../assets/logo4.png";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const Navbar = ({textColor}) => {
  const dispatch = useDispatch();
  const [toogle, setToogle] = useState(false);
  const [sideToggle,setSideToggle]=useState(false);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const handleLogout = () => {
    dispatch(signout());
  };
  // console.log(toogle);
  // console.log(currentUser?.profilePhoto);

  const handleSideToggle=()=>{
    setSideToggle(!sideToggle);
  }

  return (
    <div>
      <div className="my-5 w-full flex relative font-[10px]  p-5 rounded-lg ring-1 shadow-lg bg-primary ring-slate-200 items-center justify-between h-[4rem]">
        <div className={`flex justify-between w-1/3 ${textColor} max-xl:hidden`}>
          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/">Shop</Link>
          <Link to="/">Blogs</Link>
          <Link to="/">Health</Link>
          <Link to="/">About</Link>
        </div>
        <div onClick={handleSideToggle}>
          <IoMenu className={`${textColor} size-10 xl:hidden cursor-pointer` }/>
        </div>
        <div>
          {currentUser ? (
            <div className="w-2/3 h-full flex flex-col items-center">
              <button className="w-12 right-8 mx-2 flex items-center  font-semibold rounded-full">
                <img
                  src={currentUser?.profilePhoto}
                  alt="Logo"
                  className="size-12 rounded-full bg-slate-200 text-black hover:ring-2 ring-green-50"
                  onClick={() => setToogle(!toogle)}
                />
              </button>
              {toogle && <DropMenu />}
            </div>
          ) : (
            <div className="w-2/3 h-full flex flex-col items-center justify-center">
            <Link
              to="/signup"
              className="absolute right-0 mx-4 font-semibold bg-slate-300 px-7 py-1 rounded-md hover:bg-slate-500 items-center text-lg"
            >
              LogIn
            </Link>
            </div>
          )}
        </div>
      </div>
      {sideToggle && <div className="absolute h-full w-[40%] max-sm:w-[60%] bg-slate-100 bottom-[0.1rem] left-0 rounded-lg">
        <div onClick={handleSideToggle} className="w-full flex justify-end p-2 cursor-pointer">
        <IoMdClose className="size-7 "/>
        </div>
        <div className="mt-16 flex flex-col">
          <ul className=" w-full text-center text-lg grid grid-cols-1 gap-2">
            <Link to='/'>
            <li className="ring-1 shadow-md shadow-orange-400 hover:bg-slate-400 p-2 rounded-lg text-[1.5rem] font-mono m-2 mb-0">Home</li>
            </Link>
            <Link to='/recipes'>
            <li className="ring-1 shadow-md shadow-orange-400 hover:bg-slate-400 p-2 rounded-lg text-[1.5rem] font-mono m-2 mb-0">Recipes</li>
            </Link>
            <Link to='/'>
            <li className="ring-1 shadow-md shadow-orange-400 hover:bg-slate-400 p-2 rounded-lg text-[1.5rem] font-mono m-2 mb-0">Shops</li>
            </Link>
            <Link to='/'>
            <li className="ring-1 shadow-md shadow-orange-400 hover:bg-slate-400 p-2 rounded-lg text-[1.5rem] font-mono m-2 mb-0">Blogs</li>
            </Link>
            <Link to='/'>
            <li className="ring-1 shadow-md shadow-orange-400 hover:bg-slate-400 p-2 rounded-lg text-[1.5rem] font-mono m-2 mb-0">Health</li>
            </Link>
            <Link to='/'>
            <li className="ring-1 shadow-md shadow-orange-400 hover:bg-slate-400 p-2 rounded-lg text-[1.5rem] font-mono m-2 mb-0">ABout</li>
            </Link>  
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default Navbar;
