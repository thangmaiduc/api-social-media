const router = require('express').Router();
const Message = require('../model/messages')


router.get('/:conversationId',async (req, res)=>{
    try {
       let messages = await Message.find({conversationId: req.params.conversationId})
       res.status(200).json(messages)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})
router.post('/', async (req, res)=>{
    try {
        let newMessage = new Message(req.body)
        await newMessage.save();
        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})




// get friends

module.exports=  router