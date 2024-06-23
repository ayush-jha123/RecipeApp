import React, { useEffect, useState } from "react";
import { Rating } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { getUser } from "../../api";
import moment from 'moment';

const RecipeCards = (recipe) => {
  console.log(recipe);
  const [user,setUser]=useState();
  const getuser=async()=>{
    const response=await getUser(recipe.UserId)
    setUser(response.data);
    console.log(response);
  }
  useEffect(() => {
    getuser()
  }, [])

  return (
    <Link to={`/recipedetails/${recipe._id}`} className=" w-[20rem] bg-white gap-2 rounded-lg shadow-lg ring-2  m-2  flex flex-col justify-center max-md:w-[18rem]">
      <div className="bg-white flex flex-row px-4 pt-2.5 rounded-lg space-x-3">
        <div className="flex items-center w-10">
          <h1 className="bg-red-500 text-white rounded-full  text-center size-10 text-[1.5rem]">
            {user?.name?.charAt(0)?.toUpperCase()}
          </h1>
        </div>
        <div className="text-slate-500 flex flex-col space-y-0">
          <p>{user?.name}</p>
          <p>{moment(recipe?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
      </div>
      <div className="w-full">
        <img src={recipe?.imgUrl} alt="" className="w-full h-[16rem] " />
      </div>
      <div className="px-2 py-1">
          <h1 className="text-[1.5rem] font-serif ">{recipe?.title}</h1>
        <p className="text-slate-600 font-semibold line-clamp-4">
          {recipe?.description}
        </p>
      </div>
    </Link>
  );
};

export default RecipeCards;
