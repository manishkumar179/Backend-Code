const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");

let followUnfollowController = async (req, res) => {
  try {
    let followerId = req.params.followerId;

    if (!followerId)
      return res.status(404).json({
        message: "Invalid request",
      });

    let user = await UserModel.findById(followerId);

    if(user.followers.includes(req.user._id)){
        await UserModel.findByIdAndUpdate(
            followerId,
            {
                $pull:{followers : req.user._id}
            },
            {
                new:true
            }
        )

    } else{
        await UserModel.findByIdAndUpdate(
            followerId,
            {
                $push:{followers: req.user._id}
            },
            {
                new:true
            }
        )
    }

    return res.status(200).json({
      message: "Follower added",
      user,
    });


  } catch (error) {
    console.log("error in FU api", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = {
    followUnfollowController,
}