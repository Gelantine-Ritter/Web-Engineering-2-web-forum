const express = require('express');
const router = express.Router();


const Post = require('../../models/Forum/Post');
const authentication = require('../../my_modules/authToken');
const PostsController = require('../../controller/posts');


/*********************PUBLIC ACCESS***********************************************/

router.get('/', PostsController.posts_get_all);
router.get('/:id', PostsController.posts_get_by_id); 
router.get('/categories/:subject', PostsController.posts_get_by_category);
router.get('/tags', PostsController.posts_get_all_categories);
router.get('/:id/comments', PostsController.post_show_all_comments); //noch nicht ganz fertig
router.get('/comment/:id', PostsController.comment_get_by_id); 


/*********************LOGGED IN USER ACCESS***********************************************/


router.post('/new', authentication.auth, PostsController.posts_create_new);
//router.post('/new', PostsController.posts_create_new);

router.post('/:id/add/comments', authentication.auth, PostsController.posts_add_comment); //NICHT FERTIG
router.get('/postedBy/:id', authentication.auth ,PostsController.posts_by_user_id); 
//router.post('/add/comments', auth,PostsController.add_comment);//NICHT FERTIG


/*********************ADMIN ACCES***********************************************/

router.delete('/delete/:id',authentication.authAdmin, PostsController.posts_delete_one);
router.put('/update/:id', authentication.authAdmin, PostsController.posts_update_by_id); //noch nicht ganz fertig



module.exports = router;