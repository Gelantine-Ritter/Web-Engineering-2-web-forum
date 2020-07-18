const User = require('../models/User/User'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    Joi = require('@hapi/joi');



/**NOCH ZU IMPLREMTIEREN
 * --User muss pw ändern können und user muss dann upgedated werden
 */

/*******************SCHEMA FÜR VALIDIERUNG DES USER REGISTER INPUTS******************************************* */

const schemaRegist = Joi.object().keys({
    username: Joi.string().min(3).required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
    isAdmin: Joi.boolean().default(false)
});


/*******************REGISTER******************************************* */

exports.user_register = async (req, res) => {
    const firstUser = await User.find();
    console.log(process.env.ADMINPW);
    if (firstUser.length < 1) {
        const salt = await bcrypt.genSalt(10); //107
        var hashedPW1 = await bcrypt.hash(req.body.password, salt); //108
        console.log('hier bin ich')
        console.log(hashedPW1);

        const firstIsAdmin = new User({
            username: "admin",
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPW1,
            isAdmin: true
        });

        try {
            const savedUser = await firstIsAdmin.save()
            res.send({
                user: firstIsAdmin.username
            } + "Created new Admin")
        } catch (err) {
            res.status(400).send(err)
        }

    } else {
        const {
            error
        } = schemaRegist.validate(req.body);
        if (error) return res.send(error.details[0].message); //103/104

        //check ob User (mail) schon in db ist
        const userExist = await User.findOne({
            email: req.body.email
        });
        if (userExist) return res.send('E-Mail ist bereits registriert');

        //hash pw /106
        const salt = await bcrypt.genSalt(10); //107
        const hashedPW = await bcrypt.hash(req.body.password, salt); //108

        //user registrieren bzw neuen user anlegen
        const user = new User({ //105
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPW, //109,
            //role:'admin'
        });
        try {
            const savedUser = await user.save();
            res.send({
                user: user._id
            });
        } catch (err) {
            res.send(err);
        }
    };
}

/*******************SCHEMA FÜR VALIDIERUNG DES USER LOGIN INPUTS******************************************* */

const schemaLogin = Joi.object().keys({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required()
});

/*******************LOGIN******************************************* */

exports.user_login = async (req, res) => {
    const {
        error
    } = schemaLogin.validate(req.body);
    if (error) return res.send(error.details[0].message); //103/104

    //check ob User in db registriert ist
    const userExist = await User.findOne({
        email: req.body.email
    });
    if (!userExist) return res.send('E-Mail oder Passwort stimmen nicht----(email)'); //201
    //check ob es das richtige pw ist
    const validPW = await bcrypt.compare(req.body.password, userExist.password); //202
    if (!validPW) return res.send('E-Mail oder Passwort stimmen nicht----(pw)');

    //jwt
    const jwtKey = process.env.TOKEN_SECRET;
    const jwtExpirySeconds = 300;
    const token = jwt.sign({
        _id: userExist._id,
        isAdmin: userExist.isAdmin
    }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    });
    res.header('Authtoken', token).send({
        userID: userExist._id,
        user:userExist.username
    });
};

/********************GET/DELETE USER AS ADMIN*********************************************************************** */


exports.user_get_all = async (req, res) => { ///get alle posts abrufen und 302
    try {
        const result = await User.find()
        res.json(result);
    } catch (err) {
        console.log(err)
    }
};

exports.user_get_by_id = async (req, res, ) => {
    try {
        const result = await User.findById(req.params.id)
        if (result == null) {
            console.log("exports.user_get_by_id --- err")
            return res.json({
                message: 'Cannot find post'
            })
        }
        res.json({
            user: result._id
        });
    } catch (err) {
        console.log(err)
        res.send("User existiert nicht")
    }
};

exports.user_delete_by_id = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndRemove({
            _id: req.params.id
        });
        res.json({
            message: "User deleted"
        });
    } catch (err) {
        res.json({
            message: "user not found"
        });
    }
};

/**************************UPDATE NACH EIGENER USERCHANGE***************************************************** */
exports.user_update_one = async (req, res) => {
    try {
        const updatedUser = await User.update({
            _id: req.params.id
        }, req.body);
        res.json(updatedUser);
    } catch (err) {
        res.json({
            message: err
        });
    }
};