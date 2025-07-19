import { response } from "express";
import post from "../models/post.js";
import mongoose from "mongoose";
import Testimonial from '../models/testimonial.js';

export const createPost = async (req, res) => {
  const data = req.body;
  try {
    const result = await post.create(data);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalPosts = await post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    const result = await post.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      posts: result,
      currentPage: page,
      totalPages: totalPages,
      totalPosts: totalPosts,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getPost = async (req, res) => {
  try {
    const result = await post.findById(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const commentPost = async (req, res) => {
  try {
    const addedComment = await post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comment: req.body,
        },
      },
      { new: true } //ensure i get updated doc not prev
    );
    if (!addedComment)
      return res.status(404).json({ message: "post not found" });
    return res.status(200).json(addedComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updatePost = async (req, res) => {
  const {_id}=req.body;
  console.log(_id);
  // console.log(req.body);
  try {
    const updatedPost=await post.findByIdAndUpdate(_id, req.body, { new: true });
    // console.log(updatedPost)

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Post doesn't exists" });
    await post.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: "Recipe is deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const recipe = await post.findById(id);

    if (recipe?.disLikeCount?.includes(userId)) {
      await post.findByIdAndUpdate(id, {
        $pull: { disLikeCount: userId },
      });
    } 

    if(recipe?.likeCount?.includes(userId)){
        await post.findByIdAndUpdate(id,{
            $pull:{likeCount:userId}
        })
    }else{
        await post.findByIdAndUpdate(id,{
            $push:{likeCount:userId}
        })
    }
    return res.status(200).json({ message: "Like Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const dislikePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  console.log(id," ",userId)
  try {
    const recipe =await post.findById(id);

    if (recipe?.likeCount?.includes(userId)) {
      await post.findByIdAndUpdate(id, {
        $pull: { likeCount: userId },
      });
    }
    if(recipe?.disLikeCount?.includes(userId)){
        await post.findByIdAndUpdate(id,{
            $pull:{disLikeCount:userId}
        })
    }else{
        await post.findByIdAndUpdate(id,{
            $addToSet:{disLikeCount:userId}
        })
    }
    return res.status(200).json({ message: "DisLike Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getUserPost=async(req,res)=>{
  try {
    const response=await post.find({UserId:req.params.id});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({message:'Something went wrong'});
  }
}

export const searchPosts = async (req, res) => {
  try {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchRegex = new RegExp(query, 'i');
    
    const totalPosts = await post.countDocuments({
      $or: [
        { title: searchRegex },
        { tags: { $in: [searchRegex] } },
        { name: searchRegex }
      ]
    });
    
    const totalPages = Math.ceil(totalPosts / limit);

    const result = await post.find({
      $or: [
        { title: searchRegex },
        { tags: { $in: [searchRegex] } },
        { name: searchRegex }
      ]
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      posts: result,
      currentPage: page,
      totalPages: totalPages,
      totalPosts: totalPosts,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      searchQuery: query
    });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

// {title: 'test', message: 'test', selectedFile: '', recipeProcess: '', name: 'Ayush Kumar Jha'}

export const addTestimonial = async (req, res) => {
  try {
    const { name, message, avatar } = req.body;
    if (!name || !message) {
      return res.status(400).json({ message: 'Name and message are required.' });
    }
    const testimonial = new Testimonial({ name, message, avatar });
    await testimonial.save();
    return res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ date: -1 });
    return res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
