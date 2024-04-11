const Router = require('express');
const {signup} = require('../controller/user');
const {login} = require('../controller/user');

const userRouter = Router(); 

userRouter.post('/signup', signup);

userRouter.post('/login', login);


module.exports =  userRouter 

