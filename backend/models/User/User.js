const mongoose = require('mongoose');
const { boolean } = require('@hapi/joi');


const userSchema = mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        unique:true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min:8
    },
    date:{
        type:String,
        default: Date.now
    },

    isAdmin:{
        type:Boolean,
        default:false
    },

    posts:[
        {
            type: mongoose.SchemaTypes.ObjectId, 
            ref: 'Post' 
        }
    ]
  
});

module.exports = mongoose.model('User', userSchema);

