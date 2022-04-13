const router = require('express').Router();
const Conversation = require('../model/conversations')

router.get('/:userId',async (req, res)=>{
    try {
        let userId = req.params.userId
        let conversations = await Conversation.find({members: userId})
        res.status(200).json(conversations)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})
router.post('/',async (req, res)=>{
    try {
        let newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        })
        await newConversation.save();
        res.status(201).json(newConversation)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})



// get friends

module.exports=  router