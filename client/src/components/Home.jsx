import React from "react";
import bgvedio from "../assets/bgvedio2.mp4";
import Navbar from "./Navbar";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";
import { ImSpoonKnife } from "react-icons/im";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";

const Home = () => {
  return (
    <div className="min-w-screen min-h-screen ">
      <video
        src={bgvedio}
        className="w-full  h-full flex flex-center object-cover absolute z-[-1]"
        autoPlay
        muted
        loop
      />
      <div className="p-10">
        <div className="flex justify-between ">
          <div className="flex flex-row gap-3 leading-none ">
            <ImSpoonKnife className=" size-11 rounded text-white bg-inherit" />
            <h1 className="text-[35px] font-extrabold text-white">RecipeApp</h1>
          </div>

          <div className="flex flex-row gap-2 text-white max-xl:hidden">
            <div>
              <LuPhone className="size-10" />
            </div>
            <div className="font-semibold leading-5 text-lg ">
              <p>Call Us:</p>
              <p>+123-456789</p>
            </div>
          </div>

          <div className="flex flex-row gap-3 max-xl:hidden">
            <FaFacebookF className=" rounded-full w-9 h-9 p-2 bg-slate-50 text-black hover:bg-slate-500  hover:text-white" />
            <FaInstagram className=" rounded-full w-9 h-9 p-2  bg-slate-50 text-black hover:bg-slate-500  hover:text-white " />
            <FaTwitter className=" rounded-full w-9 h-9 p-2  bg-slate-50 text-black hover:bg-slate-500  hover:text-white " />
          </div>
        </div>
        <Navbar textColor="text-white"/>
        <div className=" flex flex-col w-full justify-between">
          <div className="mt-[5rem] max-sm:mt-[2rem] w-1/3 max-lg:w-[70%]">
            <ReactTyped className="text-[4rem] max-md:text-[3rem] font-bold my-4 text-slate-50 font-serif max-sm:text-[2.4rem]" strings={['Welcome to RecipeApp']} typeSpeed={40} backSpeed={60} />
              {/* Welcome to RecipeApp */}
            {/* </ReactTyped> */}
            <p className="text-slate-100 font-semibold text-[3rem] font-mono  max-sm:text-[1.4rem] ">
              LET'S EXPLORE AND SHARE RECIPES
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 mt-3 w-[20%] lg:w-[40%]  max-xl:mt-1 max-lg:w-full">
            <Link
              to="/recipes"
              className="flex flex-row sm:w-2/3  bg-primary rounded-[6px] justify-between px-3 py-3 items-center ring-1 ring-white text-white hover:bg-slate-200 hover:text-black "
            >
              <div className="text-[18px] font-semibold ">
                Explore Our Recipies
              </div>
              <div className="flex align-middle  text-primary ">
                <FaArrowRightLong />
              </div>
            </Link>
            <Link
              to="/shareRecipes"
              className="flex w-[80%] flex-row sm:w-1/3  text-white rounded-[6px] justify-between py-3 px-3 items-center ring-1 ring-white hover:bg-slate-200 hover:text-black"
            >
              <div className="text-[18px] font-semibold text-primary">
                Share Recipe
              </div>
              <div className="flex align-middle text-primary">
                <FaArrowRightLong />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
