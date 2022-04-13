const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    userId:{
        type: String,
        require: true,
    },
    
    img:{
        type: String,
        default : ''
    },
   
    likes:{
        type: Array,
       default : [] 
    },
    
    desc:{
        type: String,
        max: 500
    },
    
    
},{
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)