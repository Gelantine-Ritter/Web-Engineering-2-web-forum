var express = require('express');
var router = express.Router();
//const {authUser, authRole} = require('../user/auth');//301
const authUser = require('../user/authToken');
const Post = require('../../models/Forum/Post'); //Post großgeschrieben : also Obj --> importiert mein modul mit absoluten pfad also mein modul f model f post

const checkAccess=require('../user/auhtAdmin');
const { NotExtended } = require('http-errors');
//get all posts

/*router.get('/', function(req, res, next) { ///get alle posts abrufen
    //  res.send('Befinde mich in Posts')
    //sobald zugrif auf post obj auch zugriff auf db
    //suche auf db ausfürhen
    Post.find({}, function(err, posts) {
        var postMap = {}
        posts.forEach(function(post) {
            postMap[post._id] = post //für jeden post der gefunden wird wird der post in die map an der stelle post id gegeben und ausgegeben
        });
        res.send(postMap)
    });
}); //hier wird in spalte der db Post gesucht und gibt maps zurück
*/


router.get('/', async(req, res ) => { ///get alle posts abrufen und 302
    try {
        const result = await Post.find()
        res.json(result);
    } catch (err) {
        console.log(err)
    }
});




//get user id etc
/*router.get('/', verify, async(req,res)=>{
res.send(req.userExist);
});*/

/*
//get post by id
router.get('/:_id', function(req, res, next) { ///get alle posts abrufen
    Post.findById(req.params._id, function(err, posts) {
        var postMap = {}
        posts.forEach(function(post) {
            postMap[post._id] = post //für jeden post der gefunden wird wird der post in die map an der stelle post id gegeben und ausgegeben
        })
        res.send(postMap)
    })

}); //hier wird in spalte der db Post gesucht und gibt maps zurück
*/


//get post by id
router.get('/:id', async(req, res, ) => { ///get alle posts abrufen
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


//CREATE add new post to db
router.post('/',authUser,  async(req, res) => { // async abläufe zu ende bringenalso zu erst obj speichern dann weiter mavhen
    let postObj = new Post({ //hole Model aus oben absoluten Pfad also aus dem Model
        //jetzt daten ziehen aus userinput die auf schemea im Model passen
        author: req.body.author, //body aus html : irgendwo in request gibts body und im body gibts feld mit name author
        title: req.body.title,
        text: req.body.text,
        date: req.body.date
    }); //obj ertsellt und soll in db --> 
    try {
        postObj = await postObj.save(); //speichert in db --> await googlen
        console.log('Post angeleget');
    } catch (err) {
        console.log(err)
    }
});

router.delete('/:id', function(req,res){
Post.findByIdAndRemove(req.params.id).exec().then(doc =>{
    if(!doc){
        return res.send("document not found").end();
    }return res.send("document deleted").end();
})
.catch(err=>next(err));
  //400
});



module.exports = router;

//301       import auth
//302       so auth über toke aufrufen

//400       params.id ist die id von oben url sozusagen und mit exec führe remove aus wenn post gefunden