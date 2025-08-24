const express=require('express');
// const userController=require('./../controllers/usercontroller');
const authController=require('./../controllers/authController');
const userRouter= express.Router();

userRouter.post('/verifysignup',authController.verifySignup,authController.sendOTP);
userRouter.post('/signup',authController.verifyOTP,authController.signup);

userRouter.post('/verifyLogin',authController.verifyLogin, authController.sendOTP);
userRouter.post('/login',authController.verifyOTP, authController.login);


// userRouter.post('/forgotPassword',authController.forgotPassword);
// userRouter.patch('/resetPassword/:token',authController.resetPassword );
 


// userRouter.route('/')
//     .get(userController.getAllUsers)
//     .post(userController.addNewUser)
// userRouter.route('/:id?')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser)

module.exports=userRouter;