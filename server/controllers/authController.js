const User= require('./../models/userModel');
const crypto=require('crypto');
const { promisify }=require('util');
const jwt= require('jsonwebtoken');
// const AppError= require('./../utils/appError');
const sendEmail= require('./../utils/sendEmail');
const generateOTP = require('./../utils/generateOTP');
// const { use } = require('../app');
// const { use } = require('../app');

const signToken = id=>{
    return jwt.sign({id} , process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN});
}

exports.verifySignup=async(req,res,next)=>{
    const { username, email,regno,password,passwordConfirm, role } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }
    // const usernameExists = await User.findOne({ username });
    const emailExists = await User.findOne({ email });
    // if (usernameExists) {
    //     return res.status(400).json({ success: false, message: 'Username already exists' });
    // }
    if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    req.app.locals = {username, regno, email, password,passwordConfirm, role, isVerified: true};
    next();
}
exports.signup= async (req,res) =>{
    const { username, regno, password,passwordConfirm, email, role} = req.app.locals;

    const newUser= await User.create({
        username: username,
        email:email,
        regno: regno,
        password:password,
        passwordConfirm:passwordConfirm,
        role: role
    });
    if(newUser){
        const token= signToken(newUser._id);
    
        res.status(200).json({
            success: true,
            token,      
            
            user: newUser,
            message: "Registration Successful!"
            
        })
    }
    else{
        res.status(400).json({ success: false, message: 'Failed to create user' });
    }
}
exports.verifyLogin= async(req,res,next)=>{
    const {email, password,role} =req.body;

    //1.Check if email exists and passowrd exist
    if(!email || !password){
        return res.status(401).json({ success: false, message: 'Please enter all fields' });
    }


    const user=await User.findOne({email}).select('+password');
    const correct =await user.correctPassword(password,user.password);
    
    if(!user|| !correct){
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    if(user.role !== role){
        return res.status(401).json({success: false, message: 'Access Denied, Invalid Role'})
    }
    req.app.locals = {user,email, isVerified: true};
    next();

}


exports.login= async (req,res) =>{
    

    // //1.Check if email exists and passowrd exist
    // if(!email || !password){
    //     return res.status(401).json({ success: false, message: 'Please enter all fields' });
    // }

    // //2.Check if user exists && password is correct
    // const user=await User.findOne({email}).select('+password');
    // const correct =await user.correctPassword(password,user.password);
    
    // if(!user|| !correct){
    //     return next(new AppError('Please provide correct email or password',401));
    // }

    // //3.If everything OK, send token to client
    // const token=signToken(user._id);
    // res.status(200).json({
    //     status:'success',
    //     token
    // })
    if(req.app.locals.isVerified && req.app.locals.verifiedOTP){
        const user = req.app.locals.user;
        console.log(user);
        if(user){
            req.app.locals = {};
            const token=signToken(user._id);
            return res.status(200).json({
                     success: true,
                     token,
                     user:user
            })
        }
    }
    return res.status(401).json({ success: false, message: 'Verification Not Done' });
    
};

exports.protect= async (req,res,next)=>{

    let token;
    //1.Getting token and check of its there.
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token= req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new AppError('not Logged in  dude',401));
    }

    //2.Verification token
    let decoded;
    try{decoded= await promisify(jwt.verify)(token, process.env.JWT_SECRET);}
    catch{
        return next(new AppError('Invalid token',401));
    }

    //3.Check if user still exists.
    const freshUser= await User.findById(decoded.id);
    if(!freshUser){
        return next(new AppError('The user belonging to the token does not longer exists',401));
    }   
 
    //4.Check if the user changed password after the token was issued.
    // if(await freshUser.changedPasswordAfter(decoded.iat)){
    //     return next(new Ap   Error('User recently changed password , please loggin again',401));
    // } 
    // //Grant access to protected routes.
    req.user=freshUser;
    next();
}   

exports.restrictTo = (...roles)=>{
    return (req,res,next)=>{
        //roles is an array roles['admin, leaed-guide], role=user
        if(!roles.includes(req.user.role)){
            return next(new AppError('DO you really think you have access to do this?',403));
        }

        next();
    }
}


exports.forgotPassword= async (req,res,next) =>{
    //1.Get user based on POSTed email          
    const user= await User.findOne({email: req.body.email});
    if(!user) {
        return next(new AppError('NO user exists with this email',404));
    }
    //2.Generate the random reset token
    const resetToken= user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});
    //3.Sending it to users' email
    const resetURL= `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    const message=`Forgot your password ?Submit a patch request with your new password and passwordConfirm to: ${resetURL}.\nIf you didnt then please ignore this email. `
    try{await sendEmail({
        email: user.email,
        subject: 'your password token will be valid for 10 minutes',
        message
    });
    res.status(200).json({
        status: "success",
        message:"token sent to email"
    })
    }
    catch(err){
        user.PasswordResetToken=undefined;
        user.PasswordRessetTokenExpires=undefined;
        await user.save({validateBeforeSave: false});

        return next(new AppError('There was an error sending an email, try again later ',500));
   }
    
}
exports.resetPassword= async (req,res,next) =>{
    //1.Get user based on the token
    const hashedToken= crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user= await User.findOne({
        PasswordResetToken:hashedToken,
        PasswordRessetTokenExpires: {$gt:Date.now()}
    })
    //2.IF token has not expires and there is a user then set the password
    if(!user){
        return encodeXText(new AppError('Token is invalid or has expired',400));
    }
    user.password=req.body.password;
    user.passwordConfirm= req.body.passwordConfirm;
    user.PasswordResetToken=undefined;
    user.PasswordRessetTokenExpires=undefined;
    await user.save();
    //3.    update changedPassword at propery 


    //4.log the user in , send JWT token
    const token=signToken(user._id);
    res.status(200).json({
        status:'success',
        token
    })
}

exports.sendOTP = async(req, res) => {
    const { email, isVerified } = req.app.locals;
    if(isVerified !== true){
        res.status(400).json({ success: false, message: 'Verify Details First' });
    }
    if(!email){
        res.status(400).json({ success: false, message: 'Email Address Not Known' });
    }
    const otp = generateOTP();

    if (!otp) {
        return res.status(500).json({ success: false, message: 'Failed to generate OTP' });
    }

    const emailSent = await sendEmail(email, otp);


    if (emailSent) {
        req.app.locals.otp = otp;
        res.status(200).json({ success: true, message: 'OTP sent successfully', otp });
    } else {
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
};

exports.verifyOTP = async (req, res, next) => {
    const { otp } = req.body;
    console.log("enteredOTP", otp);
    const sentotp  =req.app.locals.otp;
    console.log("sentotp", sentotp);
    if(!sentotp){
        return res.status(400).json({ success: false, message: 'Request to Send OTP First!' });
    }
    if (otp !== sentotp) {
        return res.status(400).json({ success: false, message: 'Incorrect OTP' });
    }
    req.app.locals.verifiedOTP = true;
    next();
};