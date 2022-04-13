const router = require('express').Router();
const User = require('../model/users')
const bcrypt = require('bcrypt')



//register
router.post('/register', async (req, res)=>{
    try {
        const salt =await bcrypt.genSalt(10);
       let password =await bcrypt.hash( req.body.password, salt)
        let newUser = {
            username :req.body.username,
            email : req.body.email,
            password         }
        const user = new User(newUser);
        await user.save();
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error)
    }
})
//login
router.post('/login' ,async (req, res)=>{
    try {
       
        const user =await User.findOne({email:req.body.email});
        if(!user) return res.status(401).json('Username doesnot exsits') 
        let isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) return res.status(401).json('Password is wrong')
         
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error)
    }
})

// get friends

module.exports=  router