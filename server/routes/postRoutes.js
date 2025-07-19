import express from 'express';
import {createPost,getPosts,updatePost,deletePost,likePost,getPost,commentPost,dislikePost,getUserPost,searchPosts, addTestimonial, getTestimonials} from '../controllers/post.js';
const router=express.Router();

router.post('/createpost',createPost);
router.put('/updatepost',updatePost)
router.get('/getPosts',getPosts)
router.get('/searchPosts',searchPosts)
router.get('/getPost/:id',getPost);
router.put(`/comment/:id`,commentPost);
router.delete('/deletepost/:id',deletePost);
router.put(`/likepost/:id`,likePost);
router.put(`/dislikepost/:id`,dislikePost);
router.put('/dislikepost/:id',dislikePost);
router.get('/getUserPost/:id',getUserPost);

// Testimonial routes
router.post('/testimonial/add', addTestimonial);
router.get('/testimonial/all', getTestimonials);

export default router;