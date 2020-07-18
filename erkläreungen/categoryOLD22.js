const express = require('express');
const router = express.Router();




const Category = require('../../models/Forum/Category');
const Post = require('../../models/Forum/Post');

router.get('/',async(req, res ) => { 
    try {
        const result = await Category.find()
        res.json(result);
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;