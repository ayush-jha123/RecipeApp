import mongoose from "mongoose";

const comment=new mongoose.Schema({
    userName:{type:String},
    comment:{type:String},    
},{timestamps:true})

const postSchema=new mongoose.Schema({
    UserId:{type:String},
    title:{type:String},
    description:{type:String},
    tags:{type:Array},
    imgUrl:{type:String},
    videoUrl:{type:String},
    recipeProcess:{type:String},
    likeCount:{
        type:[String],
        default:[]
    },
    disLikeCount:{
        type:[String],
        default:[]
    },
    comment:{
        type:[comment]
    }
},{timestamps:true})

export default mongoose.model('recipe',postSchema);