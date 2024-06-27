import React, { useState } from "react";
import logo from "../assets/ayush1.jpg";
import emoji from "../assets/emoji.png";
import { ReactTyped } from "react-typed";
import { useSelector } from "react-redux";
import { updateProfile } from "../api";
import {useNavigate} from 'react-router-dom'

const About = () => {
  const {currentUser}=useSelector(state=>state.user);
  const [feedback,setFeedback]=useState();
  const navigate=useNavigate();
  console.log(currentUser)

  const handleSubmit=async()=>{
    try {
      const res=await updateProfile(currentUser._id,{feedback});
      // console.log(res);
      if(res.status===200){
        setFeedback('');
        alert('Thanks for your Feedback');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      alert('Due to technical failure Feedback not saved');
    }
  }

  return (
    <div className="w-full h-full p-12 flex flex-col justify-center items-center">
      <div className="w-full flex flex-row gap-2">
        <ReactTyped
          className="text-[4rem] font-mono text-green-700"
          strings={["Hello Users"]}
          typeSpeed={40}
          backSpeed={20}
        />
        <img src={emoji} alt="" className="w-[5rem]" />
      </div>
      <div className="w-full p-6 flex flex-col space-y-6">
        <span className="flex flex-row gap-14 max-md:flex-col items-center">
          <img
            src={logo}
            alt=""
            className="size-[16rem] rounded-full ring-1 shadow-xl max-xl:size-[14rem] "
          />
          <p className="text-[1.8rem] font-mono max-xl:text-[1.4rem] max-lg:text-[1.2rem] max-md:text[1rem]">
            Hello, fellow food enthusiasts! My name is Ayush, and I am thrilled
            to introduce you to our revolutionary app, meticulously crafted with
            the sole purpose of bringing food lovers closer to their culinary
            desires. Our mission is to bridge the gap between passionate foodies
            and the delightful dishes they crave, making the world of gastronomy
            more accessible and enjoyable for everyone.
          </p>
        </span>
        <div className="text-[1.5rem] font-mono max-md:text-[1rem]">
          <p>
            Our app is not just a repository of recipes but a thriving, scalable
            platform that holds an ever-expanding collection of hundreds of
            mouthwatering recipes. We are continuously adding new recipes to
            ensure that you always have something fresh and exciting to try.
            Whether you're a seasoned chef looking to refine your skills or a
            home cook eager to explore new flavors, you'll find a treasure trove
            of culinary inspiration here.<br/><br/> One of the unique and standout
            features of our app is its vibrant global community. It’s a platform
            where people from all corners of the world can share their unique
            culinary creations. Imagine discovering a traditional dish from a
            remote village in Italy or a spicy street food recipe from the
            bustling streets of Thailand, all at your fingertips! The diversity
            of recipes is truly astonishing, allowing you to explore and learn
            about new cuisines, cooking techniques, and cultural traditions from
            across the globe.<br/><br/> To ensure you have everything you need to succeed
            in the kitchen, each recipe comes with a meticulously detailed
            article. These articles provide comprehensive step-by-step
            instructions, carefully curated ingredient lists, and valuable tips
            to help you perfect the dish. Our goal is to make the cooking
            process as smooth and enjoyable as possible, even for the most
            complex recipes. But we didn't stop there. Understanding that visual
            learning is incredibly powerful, we've included captivating,
            high-quality videos for each recipe. Watch expert chefs in action as
            they demonstrate each step, learn their secrets, and bring their
            professional techniques into your own kitchen. These videos are
            designed to be engaging and educational, providing you with a
            virtual cooking class experience.<br/> <br/>We also recognize that questions
            can arise while you're cooking, and sometimes you need answers fast.
            That's why we've implemented a dynamic commenting feature. If you
            have any doubts or need clarification on a recipe, simply leave a
            comment, and you’ll receive a prompt and helpful response. Our
            dedicated community and support team are always ready to assist you,
            ensuring that you never feel stuck or uncertain during your culinary
            journey. Your satisfaction and culinary success are our top
            priorities. We are deeply committed to continuously improving and
            evolving our app to better serve your needs. Your feedback is
            invaluable to us, and we genuinely appreciate any suggestions or
            ideas you might have on how we can enhance your experience. We
            believe in creating a user-driven platform where your voice is heard
            and your input helps shape the future of our app.<br/> In addition to the
            wealth of recipes and the supportive community, we are constantly
            working on new features and updates to make your cooking experience
            even more enjoyable. From personalized recipe recommendations based
            on your preferences to interactive cooking challenges and events,
            there is always something exciting happening on our platform. Thank
            you for being a part of our culinary journey. We hope our app brings
            you joy, inspires your inner chef, and helps you create delicious
            memories with every dish you prepare. Happy cooking, and may your
            kitchen be filled with the aromas of your culinary masterpieces!
          </p>
        </div>
        <div className="w-full flex flex-col gap-2 mt-4">
          <h1 className="text-[2rem] font-serif">Feedback :-</h1>
          <textarea name="feedback" value={feedback} id="" placeholder="Your Valuable Feedback" className="h-24 ring-1 rounded-lg p-1" onChange={(e)=>setFeedback(e.target.value)} onKeyDown={event=>{
            if(event.key==='Enter'){
              handleSubmit();
            }
          }}/>
          <button onClick={handleSubmit} className="blue_btn">Send Feedback</button>
        </div>
      </div>
    </div>
  );
};

export default About;
