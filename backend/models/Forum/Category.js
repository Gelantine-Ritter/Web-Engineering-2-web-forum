const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    subject:{
        type:String,
      //  required:true
    }
});

module.exports = mongoose.model('Category', CategorySchema);