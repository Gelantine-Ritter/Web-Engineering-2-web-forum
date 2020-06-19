const express = require('express'),
router = express.Router(),
User = require('../../models/User/User'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
Joi = require('@hapi/joi');

const UserController = require( '../../controller/user');
//const { alternatives } = require('@hapi/joi');
const authenticate = require('../../my_modules/authToken');


/*********************USER SERVICE***********************************************/

router.post('/register', UserController.user_register);
router.post('/login', UserController.user_login);
router.put('/update/:id', UserController.user_update_one);

/*********************ADMIN ACCES***********************************************/

router.delete('/delete/:id',authenticate.authAdmin, UserController.user_delete_by_id);
router.get('/', authenticate.authAdmin, UserController.user_get_all);
router.get('/:id', authenticate.authAdmin,UserController.user_get_by_id);


module.exports =router;