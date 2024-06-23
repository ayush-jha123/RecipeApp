import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import { app } from "../../firebase";
import { createRecipes } from "../../api";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";

const shareRecipe = () => {
  const [video,setVideo]=useState();
  const [img,setImg]=useState();
  const [videoPer,setVideoPer]=useState(0);
  const [imgPer,setImagePer]=useState(0);
  const [error,setError]=useState(false);
  const [formData,setFormData]=useState({});
  const {currentUser}=useSelector(state=>state.user);
  const navigate=useNavigate();
  console.log(currentUser);

  useEffect(() => {
    video && uploadFile(video,"videoUrl");
  }, [video]);
  
  useEffect(() => {
    img && uploadFile(img,"imgUrl");
  }, [img]);
  
  const uploadFile=(file,fileType)=>{
    const storage=getStorage(app);
    const folder=fileType==="imgUrl"?"images/":"videos/";
    const fileName=new Date().getTime()+file.name;
    const storageRef=ref(storage,folder+fileName);
    const uploadTask=uploadBytesResumable(storageRef,file);

    uploadTask.on(
      "state_changed",
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        fileType==="imgUrl"?setImagePer(Math.round(progress)):setVideoPer(Math.round(progress));
      },
      (error)=>{
        setError(true);
        console.log(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          console.log(downloadURL);
          setFormData(prev=>{
            return{
              ...prev,
              [fileType]:downloadURL
            }
          })
        })
      }
    )
  }

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  const handleTags=(e)=>{
    const tags=e.target.value.split(",").map(tag=>tag.trim().toLowerCase());
    setFormData({...formData,tags});
  }
  console.log(formData);
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const response=await createRecipes({...formData,UserId:currentUser._id});
    if(response.status==200){
      alert('Recipe Shared successfully')
      navigate('/recipes');
    } 
    console.log(response);
  };
  return (
    <>
      <div className="m-6 p-6 ring-1 rounded-lg shadow-lg">
        <div className="" id="addAcv">
          <div className="">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Add Recipes
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Fill out the recipe details to share your Recipe.
            </p>
          </div>
          <div className="md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Recipe Name
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Name Of Recipe"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write about recipe"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="tag"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter multiple tags by giving comma"
                      onChange={handleTags}
                    />
                  </div>

                  <div>
                  <label
                    htmlFor="Video"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Vedio
                  </label>
                  <p className="text-sm self-center">
                    {error?(
                      <span className="text-red-700">Error Occured Try Again!!</span>
                    ):videoPer>0 && videoPer<100 ?(
                      <span className="text-slate-700">{`Uploading:${videoPer}%`}</span>
                    ):videoPer===100?(
                      <span className="text-green-700">Vedio Uploaded Successfully</span>
                    ):(" ")}
                  </p>
                  <input
                    type="file"
                    name="Video"
                    accept="video/*"
                    id="video"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setVideo((prev) => e.target.files[0])}
                  />
                </div>
                <br />
                <div>
                  <label
                    htmlFor="img"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Front Photo:
                  </label>
                  <p className="text-sm self-center">
                    {error?(
                      <span className="text-red-700">Error Occured Try Again!!</span>
                    ):imgPer>0 && imgPer<100 ?(
                      <span className="text-slate-700">{`Uploading:${imgPer}%`}</span>
                    ):imgPer===100?(
                      <span className="text-green-700">Image Uploaded Successfully</span>
                    ):(" ")}
                  </p>
                  <input
                    type="file"
                    name="Image"
                    accept="image/*"
                    id="img"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setImg((prev) => e.target.files[0])}
                  />
                </div>

                  <label
                    htmlFor="tag"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Recipe Process
                  </label>
                  <ReactQuill  theme="snow" className="w-full" value={formData?.recipeProcess} onChange={process=>setFormData({...formData,recipeProcess:process})}/>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default shareRecipe;
