const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({ //50
    postedBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
 
});

module.exports = mongoose.model('Comment', CommentSchema); //52
