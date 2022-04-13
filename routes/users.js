const router = require("express").Router();
const User = require("../model/users");
const bcrypt = require("bcrypt");


//update
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    if (id === req.body.userId ) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      const user = await User.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json(user);
    } else {
      res.status(403).json("you can update your accout");
    }
  } catch (error) {
      res.status(500).json(error.message);
      console.log(error.message);
  }
});
//delete a user
router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    if (id === req.body.userId || isAdmin) {
      const user = await User.findByIdAndDelete(id);
      res.status(204).json("deleted successfully");
    } else {
      res.status(403).json("you can delete your accout");
    }
  } catch (error) {
      res.status(500).json(error.message);
      console.log(error.message);
  }
});
//get a user
router.get("/", async (req, res) => {
  let userId = req.query.userId;
  let username = req.query.username;
  try {
    let user
    userId?
     user = await User.findById(userId, {password: 0}):
     user = await User.findOne({username}, {password: 0});
    res.status(200).json(user);
  } catch (error) {

    res.status(500).json(error.message);
    console.log(error.message);
  }
});
//get all user's friends
router.get("/friends/:userId", async (req, res) => {
 
  try {
    let userId= req.params.userId
    let user = await User.findById(userId);
    userFriends =await Promise.all( user.followings.map(async friendId =>await User.findById(friendId, {profilePicture:1, username:1, _id:1}) ))
    res.status(200).json(userFriends)
  } catch (error) {

    res.status(500).json(error.message);
    console.log(error.message);
  }
});

//follow a user
router.put('/:id/follow',async (req, res) =>{
    try {
        if(req.body.userId !== req.params.id){
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!currentUser.followings.includes(user.id)){
                await user.updateOne({$push:{ followers: currentUser._id} })
                await currentUser.updateOne({$push:{ followings: user._id} })
                res.status(200).json('you have followed successfully');
            }else{
                res.status(400).json('you already have followed');
            }
        }
        else {
            res.status(400).json('you only can follow others');
        }
        
    } catch (error) {
        
        res.status(500).json(error.message);
        console.log(error.message);
    }
})
//unfollow a user

router.put('/:id/unfollow',async (req, res) =>{
    try {
        if(req.body.userId !== req.params.id){
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(currentUser.followings.includes(user.id)){
                await user.updateOne({$pull:{ followers: currentUser._id} })
                await currentUser.updateOne({$pull:{ followings: user._id} })
                res.status(200).json('you have unfollowed successfully');
            }else{
                res.status(400).json('you havenot followed yet');
            }
        }
        else {
            res.status(400).json('you only can unfollow others');
        }
        
    } catch (error) {
        
        res.status(500).json(error.message);
        console.log(error.message);
    }
})

module.exports = router;
