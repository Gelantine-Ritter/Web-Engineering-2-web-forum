const Post = require('../models/Forum/Post');
const Comment = require('../models/Forum/Comment');
const Category = require('../models/Forum/Category');
const {
    post
} = require('../routes/forum/posts');
const {
    ConnectionStates
} = require('mongoose');
const User = require('../models/User/User');
const {
    log
} = require('debug');
const {
    query
} = require('express');




/** Noch zu implementieren:
 * --seerchbar für category und für posts --> kommt mit react??
 * --bei category an legen, checken ob diese schon angelegt ist wenn ja keine neue erstellen
 * --get posts die ein user gemacht hat
 */

exports.posts_get_all = async (req, res) => {
    try {
       const result = await Post.find().populate('category').populate('comments').populate('postedBy')
       /*const result1 = await Post.find(query).populate({
            path: 'comments',
            populate: {
                path: 'postedBy',
                model: 'User',
                populate: {
                    path: 'username'
                }
            }
        });*/
        res.send(result);
        /*
                Post.find(function(err, the_posts){// find alle post und get postet by...
                    if (err) console.log(err);
                    let printIt = "";
                    the_posts.forEach(one_post => {//iteriere über alle postobk in the posts --> für jedes obj mache etwas mit neuen obj one_post
                        let derUserDenWirWollen = User.findById(one_post.postedBy, function (err, foundUser) {//in postobj ist eine user id --> post u user haben gemeinsame id 
                            return foundUser
                        })//deruserdenwirw = variable ein user , user find by id erster param:onepost id jeder post hat id -->

                        printIt.concat(one_post.title)
                        printIt.concat(one_post.text)
                        printIt.concat(one_post.category)
                        printIt.concat("Posted by: " + derUserDenWirWollen)
                        printIt.concat('\n\r')
                    })
                    console.log(printIt);
                    
                    res.send(printIt)
                    
                })*/
    } catch (err) {
        console.log(err)
    }
};

// --> FAIL OBJECT ID
exports.post_show_all_comments = async (req, res) => {
    try {
        const myPost = await Post.findById(req.params.id)

        const result = await Comment.find({post_id: myPost._id})
        if (result == null) {
            console.log(err)
            return res.json({
                message: 'Cannot find comments'
            })
        }else{
            
            res.json(result);

        }
    } catch (err) {
        console.log(err)
    }
};

//alle comments zu einem post
exports.comment_get_by_id = async (req, res, ) => {
    try {
        const result = await Comment.findById(req.params.id)
        if (result == null) {
            console.log(err)
            return res.json({
                message: 'This comment doesnt exist'
            })
        }
        res.json(result);
    } catch (err) {
        console.log(err)
    }
};


exports.posts_get_by_id = async (req, res, ) => {
    try {
        const result = await Post.findById(req.params.id).populate('comments').populate('postedBy')
        if (result == null) {
            console.log(err)
            return res.json({
                message: 'Cannot find this Post'
            })
        }
        res.json(result);
    } catch (err) {
        console.log(err)
    }
};


// --> FAIL OBJECT ID 
exports.posts_get_by_category = async (req, res, ) => {
    try {
        const result = await Post.find({
            category: req.params.subject
        }).populate('comments')
        if (result == null) {
            console.log(err)
            return res.json({
                message: 'Cannot find a Post with this Category'
            })
        }
        res.json(result);
    } catch (err) {
        console.log(err)
    }
};

exports.posts_create_new = async (req, res) => {
    let categoryObj = new Category({
            subject: req.body.subject
    });
    let postObj = new Post({
       // postedBy: req.userExist._id, // wie username?????
        title: req.body.title,
        text: req.body.text,
       category: categoryObj
    });
    try {
        categoryObj = await categoryObj.save();
        postObj = await postObj.save();   
        console.log('Post angeleget');
    } catch (err) {
        console.log(err)
    }
};

//FAIL OBJ ID ERROR
exports.posts_get_all_categories = async (req, res) => {
    try {
        const result = await Category.find({
            subject: 'subject'
        });
        res.json(result);
    } catch (err) {
        console.log(err)
    }
};


exports.posts_add_comment = async (req, res) => {

    var postID = (await Post.findById({_id:req.params.id}))

    let commentObj = new Comment({
        postedBy: req.userExist.username, 
        text: req.body.text,
        post_id: postID.id
    });

    await commentObj.save();
    Post.findOneAndUpdate({
            _id: req.params.id
        }, {
            $push: {
                comments: commentObj
            }
        },
        function (err, success) {
            if (err) {
                console.log(err);
            } else {
                console.log(success);
            }
        }
    )
};

exports.posts_delete_one = async (req, res, ) => {
    try {
        const result = await Post.findByIdAndRemove(req.params.id)
        if (result == null) {
            console.log(err)
            return res.json({
                message: 'Cannot find post'
            })
        }
        res.send('Post deleted');
    } catch (err) {
        console.log(err)
    }
};

exports.posts_update_by_id = async (req, res) => {
    try {
        const updatedUser = await Post.update({
            _id: req.params.id
        }, req.body);
        res.json(updatedUser);
    } catch (err) {
        res.json({
            message: err
        });
    }
};

//NOCH IMPLEMENTIEREN

exports.posts_by_user_id = async (req, res) => {

};



