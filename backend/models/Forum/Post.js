const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({ //50
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    text: String,
    date: {
        type: Date,
        default: Date.now
    },
    category:{
         type: mongoose.Schema.Types.ObjectId,
        // required:true,
         ref: 'Category'
     },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model('Post', PostSchema);