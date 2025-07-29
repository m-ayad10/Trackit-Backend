const express=require('express')
const { SignUp, Login, verifyToken, signOut } = require('../Controller/UserController')
const { signUpValidation, loginValidation } = require('../Middlewares/UserMiddlewares')
const router=express.Router()

router.post('/signup',signUpValidation,SignUp)
router.post('/login',loginValidation,Login)
router.get('/verify-token',verifyToken)
router.post('/logout',signOut)


module.exports=router