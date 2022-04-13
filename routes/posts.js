const router = require("express").Router();
const Post = require("../model/posts");
const User = require("../model/users");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.json("hello world");
});
//create
router.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
});
//update
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const post = await Post.findById(id);

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("update post success");
    } else {
      res.status(403).json("you can update your post");
    }
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
});
//delete a post
router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const post = await Post.findById(id);

    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(204).json();
    } else {
      res.status(403).json("you can delete your post");
    }
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
});
// get a post
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const post = await Post.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
});
// like a post
router.put("/:id/like", async (req, res) => {
  try {
    if(!req.body.userId )
      res.status(401).json("you must sign in");
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      
      res.status(200).json("you liked post success");
    } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
      
        res.status(200).json("you unliked post success");
    }
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  } 
});
// get posts timeline
router.get('/timeline/:userId',async (req, res)=>{
    try {
        const userId = req.params.userId
        const user = await User.findById(userId);
        const userPost = await Post.find({userId});
        const friendPosts = await Promise.all(
            user.followings.map( async userfollowing=>{
                return  Post.find({userId: userfollowing}); 
            })
        )
       
        res.status(200).json(userPost.concat(...friendPosts))
      } catch (error) {
        res.status(500).json(error.message);
        console.log(error.message);
      }
})
router.get('/profile/:username',async (req, res)=>{
    try {
        const username = req.params.username
        const user = await User.findOne({username});
        const userPost = await Post.find({userId: user._id});
       
       
        res.status(200).json(userPost)
      } catch (error) {
        res.status(500).json(error.message);
        console.log(error.message);
      }
})

module.exports = router;
