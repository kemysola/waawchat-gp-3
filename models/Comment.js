const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
   
    comments: {
        type: String
    }
},{timestamps:true});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;