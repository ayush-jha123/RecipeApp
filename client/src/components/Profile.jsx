// import React, { useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { HiOutlinePencil } from "react-icons/hi2";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { app } from "../firebase";
// import { deletePost, fetchUserRecipe, updateProfile } from "../api";
// import { signout, signup } from "../redux/user/userSlice";
// import RecipeCards from "./recipe/RecipeCards";
// import { ImSpoonKnife } from "react-icons/im";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// const Profile = () => {
//   const fileRef = useRef(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [recipes, setRecipes] = useState([]);
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [image, setImage] = useState(undefined);
//   const [imagePer, setImagePer] = useState(0);
//   const [imageError, setImageError] = useState(false);
//   const { currentUser } = useSelector((state) => state.user);
//   const [page, setPage] = useState(1);
//   console.log(currentUser);
//   useEffect(() => {
//     if (image) {
//       handleFileUpload(image);
//     }
//   }, [image]);

//   const handleFileUpload = async (image) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + image.name;
//     const storageRef = ref(storage, "userProfile/" + fileName);
//     const uploadTask = uploadBytesResumable(storageRef, image);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setImagePer(Math.round(progress));
//       },
//       (error) => {
//         setImageError(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setProfilePhoto(downloadURL);
//           console.log(downloadURL);
//         });
//       }
//     );
//   };

//   useEffect(() => {
//     const updateThisProfile = async () => {
//       if (profilePhoto) {
//         const res = await updateProfile(currentUser?._id, profilePhoto);
//         console.log(res);
//         if (res.status === 200) dispatch(signup(res?.data));
//       }
//     };
//     updateThisProfile();
//   }, [profilePhoto]);

//   useEffect(() => {
//     const fetchRecipeOfUser = async () => {
//       const response = await fetchUserRecipe(currentUser?._id);
//       if (response?.status === 200) {
//         setRecipes(response?.data);
//       }
//       console.log(recipes);
//     };
//     fetchRecipeOfUser();
//   }, []);

//   const handleDelete = async (id) => {
//     const response = await deletePost(id);
//     if (response?.status === 200) {
//       fetchRecipeOfUser();
//     }
//   };
//   const handleLogout = () => {
//     console.log("bhai");
//     dispatch(signout());
//     navigate("/");
//   };

//   const pageInc = () => {
//     const totalPost = recipes.length;
//     const totalPage = Math.ceil(totalPost / 8.0);
//     console.log(totalPage);
//     if (totalPage === page) setPage(1);
//     else setPage(page + 1);
//   };
//   const pageDec = () => {
//     if (page > 1) setPage(page - 1);
//   };

//   return (
//     <div>
//       {currentUser ? (
//         <div className="w-full flex flex-row">
//           <div className="bg-slate-200 w-[26%] p-5 h-screen rounded-lg flex justify-between flex-col items-center fixed">
//             <div className="flex flex-col items-center">
//               <Link to="/" className="flex flex-row gap-3 leading-none ">
//                 <ImSpoonKnife className=" size-11 rounded text-orange-600 bg-inherit" />
//                 <h1 className="text-[35px] font-extrabold text-orange-600">
//                   RecipeApp
//                 </h1>
//               </Link>
//               <h1 className="text-[2rem] font-mono font-semibold text-orange-400">
//                 DashBoard
//               </h1>
//               <button
//                 onClick={() => fileRef.current.click()}
//                 className="bottom-[27rem] rounded-full  absolute size-[11.6rem] opacity-0 transition-opacity hover:opacity-[1] shadow-lg shadow-gray-700 hover:ring-1 font-thin"
//               >
//                 <HiOutlinePencil className="w-full h-full p-10 z-10 text-gray-500" />
//               </button>
//               <img
//                 src={currentUser?.profilePhoto}
//                 alt="Logo"
//                 className="rounded-full size-[12rem] bg-black items-center "
//               />
//               <p className="text-sm self-center">
//                 {imageError ? (
//                   <span className="text-red-700">
//                     Error uploading image(file size must be less than 2MB)
//                   </span>
//                 ) : imagePer > 0 && imagePer < 100 ? (
//                   <span className="text-slate-700">{`uploading:${imagePer} %`}</span>
//                 ) : imagePer === 100 ? (
//                   <span className="text-green-700">
//                     Image uploaded successfully
//                   </span>
//                 ) : (
//                   ""
//                 )}
//               </p>
//               <input
//                 type="file"
//                 hidden
//                 ref={fileRef}
//                 accepts="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//               />
//               <h1 className="text-[1.8rem] font-serif mt-3 ">
//                 {currentUser?.name}
//               </h1>
//             </div>
//             <div className="bg-slate-600 w-full p-2 rounded-lg justify-center flex">
//               <button
//                 onClick={() => handleLogout()}
//                 className="text-[1.8rem] font-mono"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//           <div className="relative left-[25rem] overflow-y-auto min-h-screen">
//             <p className="w-full p-1 font-mono text-[1.5rem]">Your Recipes:</p>
//             <div className="w-70% grid grid-cols-3 gap-4 max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
//               {recipes.map((recipe) => (
//                 <div>
//                   <RecipeCards {...recipe} />
//                   <div className="flex gap-2 p-1.5">
//                     <button
//                       onClick={() => handleDelete(recipe?._id)}
//                       className="bg-slate-100 ring-2 p-3 rounded-lg hover:bg-red-600 hover:text-white w-1/2 text-lg font-mono"
//                     >
//                       Delete
//                     </button>
//                     <Link
//                       to={`/updateRecipe/${recipe?._id}`}
//                       className="bg-slate-100 ring-2  p-3 rounded-lg hover:bg-green-500 hover:text-white w-1/2 text-lg font-mono justify-center flex"
//                     >
//                       Update
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div>
//               <div className="flex justify-center gap-1 p-2">
//                 <button
//                   onClick={pageDec}
//                   className="bg-slate-500 font-semibold p-2 flex justify-center items-center rounded-lg hover:bg-slate-800"
//                 >
//                   <MdKeyboardArrowLeft className="w-[1.8rem] h-[1.8rem] text-white" />
//                 </button>
//                 <p className="flex items-center text-lg bg-slate-800 text-white w-[2rem] justify-center rounded-lg">
//                   {page}
//                 </p>
//                 <button
//                   onClick={pageInc}
//                   className="bg-slate-500 font-semibold p-2 flex justify-center items-center rounded-lg hover:bg-slate-800"
//                 >
//                   <MdKeyboardArrowRight className="w-[1.8rem] h-[1.8rem] text-white" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center text-xl text-red-600">
//           Please Login to see your dashboard
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

import wallpaper from "../assets/wallpaper.jpg";
import logo from "../assets/ayush.jpg";
import { HiOutlinePencil } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { deletePost, fetchUserRecipe, updateProfile } from "../api";
import { signout, signup } from "../redux/user/userSlice";
import RecipeCards from "./recipe/RecipeCards";
import { ImSpoonKnife } from "react-icons/im";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Profile = () => {
  const [texttoggle, settextToogle] = useState(false);
  const [description,setDescription]=useState();
  const fileRef = useRef(null);
  const [filteredRecipe, setFilteredRecipe] = useState([]);
  const [postPerPage, setPostPerPage] = useState(4);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [image, setImage] = useState(undefined);
  const [imagePer, setImagePer] = useState(0);
  const [imageError, setImageError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  // console.log(currentUser);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, "userProfile/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePer(Math.round(progress));
      },
      (error) => {
        setImageError(error);
        alert('Error uploading image(file size must be less than 2MB)')
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfilePhoto(downloadURL);
          alert('Image uploaded successfully')
          console.log(downloadURL);
        });
      }
    );
  };

  const updateThisProfile = async (formdata) => {
    const res = await updateProfile(currentUser?._id, formdata);
    console.log(res);
    if (res.status === 200){
      dispatch(signup(res?.data));
      if(texttoggle==true) settextToogle(false);
    }
  };
  useEffect(() => {
    if(profilePhoto){
      updateThisProfile({profilePhoto});
    }
  }, [profilePhoto]);

  useEffect(() => {
    const fetchRecipeOfUser = async () => {
      const response = await fetchUserRecipe(currentUser?._id);
      if (response?.status === 200) {
        setRecipes(response?.data);
      }
      // console.log(recipes);
    };
    fetchRecipeOfUser();
  }, []);

  const handleDelete = async (id) => {
    const response = await deletePost(id);
    if (response?.status === 200) {
      fetchRecipeOfUser();
    }
  };
  const handleLogout = () => {
    console.log("bhai");
    dispatch(signout());
    navigate("/");
  };

  useEffect(() => {
    const lastIndex = (page * postPerPage);
    const firstIndex = lastIndex - postPerPage;
    console.log(firstIndex,lastIndex);
    console.log(recipes)
    setFilteredRecipe(recipes.slice(firstIndex, lastIndex)); 
    console.log('bhai') 
    console.log(filteredRecipe)
  }, [page,recipes]);


  const pageInc = () => {
    const totalPost = recipes.length;
    const totalPage = Math.ceil(totalPost / 4.0);
    if (totalPage === page) setPage(1);
    else setPage(page + 1);
  };
  const pageDec = () => {
    if (page > 1) setPage(page - 1);
  };

  const handledisc=async(e)=>{
    const res= updateThisProfile({description});
    console.log(res);
  }

  return (
    <div className="w-full flex flex-col">
      <div className=" bg-slate-400 h-[17rem] object-cover overflow-auto flex flex-row">
        <img src={wallpaper} alt="" className="w-1/2 max-lg:w-full" />
        <img src={wallpaper} alt="" className="w-1/2 max-lg:hidden" />
      </div>
      <div className="w-full flex justify-center items-center h-full ">
      <div className="bg-white absolute  w-[15rem] flex justify-center flex-col rounded-full h-[15rem] items-center ">
        <button
          onClick={() => fileRef.current.click()}
          className="bottom-[1.5rem] rounded-full  absolute size-[12.4rem] opacity-0 transition-opacity hover:opacity-[1]  shadow-lg shadow-gray-700 hover:ring-1 font-mono"
        >
          <HiOutlinePencil className="w-full h-full p-10 z-10 text-gray-500" />
        </button>

        <input
          type="file"
          hidden
          ref={fileRef}
          accepts="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img src={currentUser?.profilePhoto} alt="" className="w-[13rem] rounded-full" />
      </div>
      </div>
      <div className="w-full  mt-[7rem] flex justify-center flex-col items-center">
        <p className="text-[3rem] font-mono ">{currentUser?.name}</p>
        <p className="font-mono text-slate-300 text-[1.2rem]">
          {currentUser?.email}
        </p>
        <p className="px-[10rem] max-lg:px-[7rem] max-md:px-[5rem] max-sm:px-[3rem] w-full flex flex-row items-center justify-center mt-3 text-[1.5rem] font-mono">
          {currentUser?.description}
        </p>
        <div onClick={() => settextToogle((prev) => !prev)}>
          <HiOutlinePencil className="size-6 hover:text-red-400 cursor-pointer" />
        </div>
      </div>
      {texttoggle && (
        <div className=" w-full h-full absolute bg-[rgba(0,0,0,0.4)]">
          <div className="flex justify-center items-center h-full w-full ">
            <div className="bg-slate-200 h-[44%] flex flex-col p-3 rounded-lg w-[28%] shadow-lg shadow-blue-200">
              <div className="flex flex-row justify-between">
                <p className="text-[1.4rem] font-mono mb-5">
                  Write about yourself:
                </p>
                <IoMdClose
                  className="size-7 cursor-pointer"
                  onClick={() => settextToogle(false)}
                />
              </div>
              <textarea
                type="text"
                className="h-[70%] rounded-md"
                placeholder="Write about yourself within 20-30words"
                onChange={e=>setDescription(e.target.value)}
              />
              <button className="blue_btn mt-2" onClick={handledisc}>Save</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center w-full items-center mt-10">
            <p className="w-full p-1 font-mono text-[1.7rem] font-semibold text-center">Your Recipes:</p>
            <div className="w-70% grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {filteredRecipe.map((recipe) => (
                <div>
                  <RecipeCards {...recipe} />
                  <div className="flex gap-2 p-1.5">
                    <button
                      onClick={() => handleDelete(recipe?._id)}
                      className="bg-slate-100 ring-2 p-3 rounded-lg hover:bg-red-600 hover:text-white w-1/2 text-lg font-mono"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/updateRecipe/${recipe?._id}`}
                      className="bg-slate-100 ring-2  p-3 rounded-lg hover:bg-green-500 hover:text-white w-1/2 text-lg font-mono justify-center flex"
                    >
                      Update
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-center gap-1 p-2">
                <button
                  onClick={pageDec}
                  className="bg-slate-500 font-semibold p-2 flex justify-center items-center rounded-lg hover:bg-slate-800"
                >
                  <MdKeyboardArrowLeft className="w-[1.8rem] h-[1.8rem] text-white" />
                </button>
                <p className="flex items-center text-lg bg-slate-800 text-white w-[2rem] justify-center rounded-lg">
                  {page}
                </p>
                <button
                  onClick={pageInc}
                  className="bg-slate-500 font-semibold p-2 flex justify-center items-center rounded-lg hover:bg-slate-800"
                >
                  <MdKeyboardArrowRight className="w-[1.8rem] h-[1.8rem] text-white" />
                </button>
              </div>
            </div>
          </div>
    </div>
  );
};

export default Profile;
