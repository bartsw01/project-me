const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')


const commentSchema = new Schema({
    author:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    likedBy: [Schema.Types.ObjectId]
})

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    username:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        

    },
    googleId: String,
    content:{
        type: String,
        required: true,

    },comments:{
        type: [commentSchema]
        
    },
    category: {
        type: String,
        required: true
    },
    likedBy: [Schema.Types.ObjectId]
},{
    timestamps: true
})


module.exports = mongoose.model('Post',postSchema)