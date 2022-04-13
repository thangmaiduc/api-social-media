const mongoose = require('mongoose')
const conversationSchema = mongoose.Schema({
  members:{
      type: Array,
      default: []
  }
    
    
},{
    timestamps: true
})

module.exports = mongoose.model('Conversation', conversationSchema)