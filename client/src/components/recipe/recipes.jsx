import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../redux/user/userSlice";
import RecipeCards from "./RecipeCards";
import { fetchRecipes } from "../../api";
import { MdKeyboardArrowLeft,MdKeyboardArrowRight } from "react-icons/md";
import Navbar from "../Navbar";

const recipes = () => {
  const dispatch = useDispatch();
  const [filterTag, setFilterTag] = useState();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipe, setFilteredRecipe] = useState([]);
  const [postPerPage, setPostPerPage] = useState(8);
  const [page, setPage] = useState(1);
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  useEffect(() => {
    const lastIndex = (page * postPerPage);
    const firstIndex = lastIndex - postPerPage;
    console.log(firstIndex,lastIndex);
    setFilteredRecipe(recipes.slice(firstIndex, lastIndex));
    console.log('bhai') 
    console.log(filteredRecipe)
  }, [page,recipes]);

  const handleLogout = () => {
    dispatch(signout());
  };
  const fetchAllRecipes = async () => {
    const response = await fetchRecipes();
    if (response.status === 200) {
      setFilteredRecipe(response?.data);
      setRecipes(response?.data);
    }
  };
  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const handleSearch = (e) => {
    const filter = filterTag.trim().toLowerCase();
    const filterRecipes = recipes.filter((recipe) =>
      recipe.tags.includes(filter)
    );
    setFilteredRecipe(filterRecipes);
    setFilterTag("");
  };
  console.log(filteredRecipe);
  console.log(recipes);
  const pageInc=()=>{
    const totalPost=recipes.length;
    const totalPage=Math.ceil(totalPost/8.0)
    console.log(totalPage)
    if(totalPage===page) setPage(1);
    else setPage(page+1);
  }
  const pageDec=()=>{
    if(page>1) setPage(page-1); 
  }
  return (
    <div className="m-10 flex flex-col ">
      <Navbar textColor="text-black"/>
      <div className="w-full flex flex-row space-x-1">
        <input
          type="text"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="bg-slate-100 rounded-md ring-1 w-[90%] p-2"
          placeholder="Search your interested variety i.e panner salad veg nonveg"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button className="blue_btn w-[10%] max-md:w-[25%]" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="w-full grid lg:grid-cols-3 xl:grid-cols-4 gap-8 max-sm:grid-cols-1 sm:grid-cols-2 ">
        {filteredRecipe.map((recipe) => (
          <RecipeCards {...recipe} />
        ))}
      </div>
      <div>
        <div className="flex justify-center gap-1 p-2">
          <button onClick={pageDec} className="bg-slate-500 font-semibold p-2 flex justify-center items-center rounded-lg hover:bg-slate-800"><MdKeyboardArrowLeft className="w-[1.8rem] h-[1.8rem] text-white"/></button>
          <p className="flex items-center text-lg bg-slate-800 text-white w-[2rem] justify-center rounded-lg">{page}</p>
          <button onClick={pageInc} className="bg-slate-500 font-semibold p-2 flex justify-center items-center rounded-lg hover:bg-slate-800"><MdKeyboardArrowRight className="w-[1.8rem] h-[1.8rem] text-white"/></button>
        </div>
      </div>
    </div>
  );
};

export default recipes;
