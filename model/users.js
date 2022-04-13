const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    profilePicture:{
        type: String,
        default : ''
    },
    coverPicture:{
        type: String,
        default : ''
    },
    followings:{
        type: Array,
       default : [] 
    },
    followers:{
        type: Array,
       default : [] 
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    desc:{
        type: String,
        max: 50
    },
    city:{
        type: String,
        max: 50
    },
    country:{
        type: String,
        max: 50
    },
    relationship:{
        type: Number,
        enum: [1,2,3]
    }
    
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)