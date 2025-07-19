import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../redux/user/userSlice";
import RecipeCards from "./RecipeCards";
import LoadingSpinner from "./LoadingSpinner";
import { fetchRecipes, searchRecipes } from "../../api";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Navbar from "../Navbar";

const recipes = () => {
  const dispatch = useDispatch();
  const [filterTag, setFilterTag] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(signout());
  };

  const fetchAllRecipes = async (page = 1) => {
    setLoading(true);
    setIsSearching(false);
    try {
      const response = await fetchRecipes(page, 8);
      if (response.status === 200) {
        const { posts, currentPage, totalPages, totalPosts, hasNextPage, hasPrevPage } = response.data;
        setRecipes(posts);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
        setTotalPosts(totalPosts);
        setHasNextPage(hasNextPage);
        setHasPrevPage(hasPrevPage);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async (query, page = 1) => {
    setLoading(true);
    setIsSearching(true);
    setSearchQuery(query);
    try {
      const response = await searchRecipes(query, page, 8);
      if (response.status === 200) {
        const { posts, currentPage, totalPages, totalPosts, hasNextPage, hasPrevPage } = response.data;
        setRecipes(posts);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
        setTotalPosts(totalPosts);
        setHasNextPage(hasNextPage);
        setHasPrevPage(hasPrevPage);
      }
    } catch (error) {
      console.error("Error searching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRecipes(1);
  }, []);

  const handleSearch = async () => {
    if (!filterTag.trim()) {
      fetchAllRecipes(1);
      return;
    }

    await fetchSearchResults(filterTag.trim(), 1);
    setFilterTag("");
  };

  const pageInc = () => {
    if (hasNextPage) {
      if (isSearching) {
        fetchSearchResults(searchQuery, currentPage + 1);
      } else {
        fetchAllRecipes(currentPage + 1);
      }
    }
  };

  const pageDec = () => {
    if (hasPrevPage) {
      if (isSearching) {
        fetchSearchResults(searchQuery, currentPage - 1);
      } else {
        fetchAllRecipes(currentPage - 1);
      }
    }
  };

  return (
    <div className="m-10 flex flex-col">
      <Navbar textColor="text-black" />
      <div className="w-full flex flex-row space-x-1 mb-8">
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

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Search results header */}
          {isSearching && recipes.length > 0 && (
            <div className="mb-6 text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Search results for "{searchQuery}"
              </h3>
              <p className="text-gray-500 text-sm">
                Found {totalPosts} recipe{totalPosts !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          <div className="w-full grid lg:grid-cols-3 xl:grid-cols-4 gap-8 max-sm:grid-cols-1 sm:grid-cols-2">
            {recipes.map((recipe) => (
              <RecipeCards key={recipe._id} {...recipe} />
            ))}
          </div>

          {/* Pagination */}
          {recipes.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-center items-center gap-4 p-4">
                <button 
                  onClick={pageDec} 
                  disabled={!hasPrevPage}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    hasPrevPage 
                      ? 'bg-slate-500 hover:bg-slate-800 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <MdKeyboardArrowLeft className="w-5 h-5" />
                  Previous
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Page</span>
                  <span className="bg-slate-800 text-white px-3 py-1 rounded-lg font-semibold">
                    {currentPage}
                  </span>
                  <span className="text-gray-600">of {totalPages}</span>
                </div>
                
                <button 
                  onClick={pageInc} 
                  disabled={!hasNextPage}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    hasNextPage 
                      ? 'bg-slate-500 hover:bg-slate-800 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next
                  <MdKeyboardArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-center text-gray-500 text-sm">
                Showing {recipes.length} of {totalPosts} recipes
              </div>
            </div>
          )}

          {/* No results message */}
          {!loading && recipes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No recipes found</h3>
              <p className="text-gray-500">
                {isSearching ? "Try adjusting your search terms" : "Check back later for new recipes!"}
              </p>
              {isSearching && (
                <button 
                  onClick={() => fetchAllRecipes(1)}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View All Recipes
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default recipes;
