const PostModel = require("../models/post.model");
const sendToIK = require("../services/storage.service");
const ApiError = require("../utils/apiError");

let createPostController = async (req, res) => {
  try {
    let { caption } = req.body;

    let images = req.files;
    if (!images)
      return res.status(400).json({
        message: "Image is required",
      });

    let uploadedImages = await Promise.all(
      images.map(async (elem) => {
        return await sendToIK(elem.buffer, elem.originalname);
      }),
    );

    let newPost = await PostModel.create({
      user_id: req.user._id,
      caption,
      imageUrl: uploadedImages.map((elem) => elem.url),
    });

    return res.status(201).json({
      message: "Post created",
      post: newPost,
    });


  } catch (error) {
    return res.status(500).json({
      message: "Interval server error",
    });
  }
};


let getAllPostController = async (req, res) => {
  try {
    let allPosts = await PostModel.find().populate("likes");

    if (!allPosts.length)
      return res.status(204).json({
        message: "Posts fetched successfully",
        posts: allPosts,
      });

    return res.status(200).json({
      message: "posts fetched successfully",
      posts: allPosts,
    });

    // return res.render("index.ejs", { posts: allPosts });
  } catch (error) {
    console.log("error in get post", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

let getSinglePostController = async (req,res)=>{
  try {
    let postId = req.params.postId;

    let post = await PostModel.findById(postId);

    if(!post) throw new Error("Gadbad in post fetch");

    res.send(post);

    
  } catch (error) {
    console.log("Error in Get single post:-  " , error)

    throw new ApiError(500 , "Internal server error")
  }
}


let likeController = async (req,res)=>{
  try {
    let postId = req.params.postId;

    if (!postId)
      return res.status(404).json({
        message: "post id not found",
      });

       let post = await PostModel.findById(postId);

       if (post.likes.includes(req.user._id)) {
      await PostModel.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: req.user._id },
        },
        {
          new: true,
        }
      );
    } else {
      await PostModel.findByIdAndUpdate(
        postId,
        {
          $push: { likes: req.user._id },
        },
        {
          new: true,
        }
      );
    }

    return res.status(200).json({
      message: "likes added",
      post,
    });

  } catch (error) {
    console.log("Error in likes  api ->" , error)
    return res.status(500).json({
      message:"Internal server error"
    })
  }
}

module.exports = {
    createPostController,
    getAllPostController,
    getSinglePostController,
    likeController,
}
 