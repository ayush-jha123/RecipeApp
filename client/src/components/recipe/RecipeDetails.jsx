import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Rating } from "@material-tailwind/react";
import { AiTwotoneLike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../redux/user/userSlice";
import {
  commentOnRecipe,
  dislikePost,
  fetchRecipe,
  getUser,
  likePost,
} from "../../api";
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import vedioIcon from "../../assets/pauselogo.jpg";
import Navbar from "../Navbar";
import { Rating, ThinStar} from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9'
}

const RecipeDetails = () => {
  const dispatch = useDispatch();
  const [rate, setRate] = useState(0);
  const [comments, setComments] = useState([]);
  const [recipe, setRecipe] = useState();
  const [commentText, setCommentText] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [likeToggle, setLikeToggle] = useState(false);
  const [disLikeToggle, setDisLikeToggle] = useState(false);
  console.log(currentUser);
  const [user, setUser] = useState();

  useEffect(() => {
    if (recipe) {
      const like = recipe?.likeCount?.length;
      const disLike = recipe?.disLikeCount?.length;
      const totalFeedback = like + disLike;
      if (totalFeedback > 0) {
        const likePer = (like / totalFeedback) * 5;
        setRate(likePer);
      }
      console.log(rate);
    }
  }, [recipe]);

  const getuser = async () => {
    const response = await getUser(recipe?.UserId);
    setUser(response.data);
    console.log(response);
  };
  useEffect(() => {
    getuser();
  }, [recipe]);
  const handleLogout = () => {
    dispatch(signout());
  };
  const fetchRecipeById = async () => {
    const response = await fetchRecipe(id);
    if (response.status === 200) {
      if (response?.data?.likeCount?.includes(currentUser?._id))
        setLikeToggle(true);
      if (response?.data?.disLikeCount?.includes(currentUser?._id))
        setDisLikeToggle(true);
      setRecipe(response?.data);
      setComments(response?.data?.comment);
    }
    console.log(recipe);
  };
  useEffect(() => {
    fetchRecipeById();
  }, []);
  console.log(rate);
  const handleLike = async () => {
    try {
      if (currentUser) {
        const response = await likePost(recipe._id, currentUser?._id);
        console.log(response);
        if (response.status === 200) {
          alert("Thanks for feedback");
          setDisLikeToggle(false);
          setLikeToggle((prev) => !prev);
        }
      } else {
        alert("First Complete Authentication");
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisLike = async () => {
    try {
      if (currentUser) {
        const response = await dislikePost(recipe._id, currentUser?._id);
        console.log(response);
        if (response.status === 200) {
          alert("Thanks for feedback");
          setLikeToggle(false);
          setDisLikeToggle((prev) => !prev);
        }
      } else {
        alert("First Complete Authentication");
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    const newComment = {
      userName: currentUser.name,
      comment: commentText,
    };
    console.log(newComment);
    const response = await commentOnRecipe(recipe._id, newComment);
    if (response.status === 200) {
      alert("Thanks for feedback");
      setCommentText("");
      fetchRecipeById();
    }
    console.log(response);
  };

  const { id } = useParams();
  return (
    <div className="m-10 flex flex-col ">
      <Navbar textColor="text-black" />
      <div className="w-full bg-white flex-col flex min-h-screen">
        <div className="flex flex-row space-x-2 w-full justify-between">
          <div className="flex flex-row justify-between gap-2">
            <div>
              <img
                src={recipe?.imgUrl}
                alt="FoodIcon"
                className="rounded-lg size-[11rem] h-full"
              />
            </div>
            <div>
              <h1 className="text-[2.5rem]  font-serif">{recipe?.title}</h1>
              <p className="text-[1rem] px-1 text-slate-500 font-serif">
                {moment(recipe?.createdAt).fromNow()}
              </p>
              <p className="text-slate-500 text-[1.2rem]">{`By ${user?.name}`}</p>
              <div className="w-full flex flex-row mb-2 h-6 gap-1">
                <Rating style={{ maxWidth: 100 }} value={rate} itemStyles={myStyles} />
                <p className="text-slate-400">{rate}/5</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row  space-x-3 h-2 max-md:flex-col max-md:space-x-0">
            <button onClick={handleLike}>
              {likeToggle ? (
                <AiTwotoneLike className="size-6" />
              ) : (
                <AiOutlineLike className="size-6" />
              )}
            </button>
            <button onClick={handleDisLike}>
              {disLikeToggle ? (
                <AiTwotoneDislike className="size-6" />
              ) : (
                <AiOutlineDislike className="size-6" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col mt-6">
          <p className="text-[1.5rem] font-serif font-semibold">
            Video From Chief :
          </p>
          <div className=" flex flex-row max-md:flex-col justify-center space-x-2 mt-4 max-md:space-y-2 max-md:space-x-0">
            <div className="w-[70%] max-md:w-full">
              <video
                src={recipe?.videoUrl}
                controls
                poster={vedioIcon}
                className="ring-1 rounded-lg w-full h-[28rem] object-contain text-center shadow-lg"
              />
            </div>
            <div className="bg-slate-200 w-[29%] rounded-md h-[28rem] ring-2 max-md:w-full">
              <h1 className="w-full bg-slate-100 text-[1.5rem] p-1 font-serif rounded-md">
                Comments
              </h1>
              <div className="h-[90%] flex flex-col justify-between">
                <ScrollToBottom className="bg-white h-[85%] overflow-auto">
                  {comments.map((comment) => (
                    <div className="flex flex--row p-2 ring-1 rounded-md mr-4 m-1 ">
                      <h1 className="bg-red-500 text-white rounded-full  text-center size-10 text-[1.5rem]">
                        {comment?.userName?.charAt(0)?.toUpperCase()}
                      </h1>
                      <div>
                        <div className="text-slate-500 flex flex-row space-x-3 items-center">
                          <p className="lowercase">@{comment.userName}</p>
                          <p className="text-[0.8rem]">
                            {moment(comment?.createdAt).fromNow()}
                          </p>
                        </div>
                        <div>
                          <p className="text-[1.2rem]">{comment.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollToBottom>
                <div className="w-full flex flex-row">
                  <input
                    type="text"
                    className="p-2 rounded-md m-2 w-[70%]"
                    placeholder="Comments"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleComment();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="blue_btn m-2"
                    onClick={handleComment}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-6 bg-slate-100 p-4 rounded-md shadow-md">
          <h1 className="text-[2rem] font-serif">Recipe Process:</h1>
          <div
            className="text-[1.2rem] font-mono "
            dangerouslySetInnerHTML={{ __html: recipe?.recipeProcess }}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
