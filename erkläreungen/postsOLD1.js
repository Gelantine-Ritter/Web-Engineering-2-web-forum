const express = require('express');
const router = express.Router();


const Post = require('../../models/Forum/Post'); 



const auth = require('../user/authToken');
const Category = require('../../models/Forum/Category');



router.get('/',async(req, res ) => { 
    try {
        const result = await Post.find()
        res.json(result);
    } catch (err) {
        console.log(err)
    }
});

router.get('/categories',async(req, res ) => { 
    try {
        const result = await Category.find()
        res.json(result);
    } catch (err) {
        console.log(err)
    }
});

//BRAUCHE ICH FIND BY ID?
//get post by id
router.get('/:id', async(req, res, ) => { 
    try {
        const result = await Post.findById(req.params.id)
        if (result == null) {
            console.log(err)
            return res.json({ message: 'Cannot find post' })
        }
        res.json(result);
    } catch (err) {
        console.log(err)
    }
});


//BRAUCH KEIN ACCESS
//get posts by category --> wie geht das???
router.get('/categories/:subject', async(req, res, ) => { 
    try {
        const result = await Post.find({subject:req.params.category})
        if (result == null) {
            console.log(err)
            return res.json({ message: 'Cannot find category' })
        }
        res.json(result);
    } catch (err) {
        console.log(err)
    }
});





//neuer post anlegen
router.post('/', auth, async(req, res) => { 
    let postObj = new Post({ 
        postedBy: req.userExist._id,// wie username?????
        title: req.body.title,
        text: req.body.text,
        category: req.body.category.subject
    }); 
    try {
        postObj = await postObj.save(); 
        console.log('Post angeleget');
    } catch (err) {
        console.log(err)
    }
});









router.delete('/:id', async(req, res, ) => { 
    try {
        const result = await Post.findByIdAndRemove(req.params.id)
        if (result == null) {
            console.log(err)
            return res.json({ message: 'Cannot find post' })
        }
        res.send('Post deleted');
    } catch (err) {
        console.log(err)
    }
});

//nur ADMIN
router.delete('/delete/:id', async(req, res, ) => { 
    try {
        const result = await Post.findByIdAndRemove(req.params.id);
        if (result == null) {
            console.log(err)
            return res.json({ message: 'Cannot find post' })
        }
        res.send('Post deleted');
    } catch (err) {
        console.log(err)
    }
});

//BASIC
router.put('/update/:id', async (req,res)=>{
    try{
        const updatedUser = await Post.update({_id:req.params.id}, req.body);
            res.json(updatedUser);
    }catch(err){
        res.json({message: err});
    }
    });





module.exports = router;

