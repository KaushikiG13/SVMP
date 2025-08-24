const mongoose= require('mongoose');
const crypto=require('crypto');
const validator= require('validator');
const bcrypt=require('bcryptjs');


//fields- name, email, photo, password, passwordConfirm
const userSchema= new mongoose.Schema({
        username:{
        type: String,
        required: [true, "A user must have a name"],
        trim: true
    },
    regno:{
      type: String,
      unique:[true,"Reg. no must be unique"],
      minlength:8
    },
    email:{ 
        type: String,
        required: [true,"A user must have a email"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail],//we arse using validators for validating the email format
    },
    photo:{
        type: String,
        // required: [true,'A user must have a photo']
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default : 'user',
    },
    password:{
        type:String,
        required:[true, "A user must have a passowrd"],
        trim: true,
        minlength: 8,
        selected: false
    },
    passwordConfirm: {
        type: String,
        required: true,
        trim: true,
        validate:{
            //this only works on CREAT AND SAVE
            //validates whether the passwordConfirm is similar to the password or not
            validator: function(el){
                return el===this.password;
            },
            message:'Passwords are not same'
        }
    },
    passwordChangedAt:Date,
    passwordResetToken: String,
    PasswordResetTokenExpires: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },

}); 

//password management
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
      // Hash the password with a cost of 12
      const hashedPassword = await bcrypt.hash(this.password, 12);
      this.password = hashedPassword;
      this.passwordConfirm = undefined;
      next();
    } catch (err) {
        res.status(400).json({ success: false, message: 'Password Not Match' });
    }
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password' ||this.isNew)){
        return next();
    }
    this.passwordChangedAt= Date.now()-1000;
    next();
});
userSchema.methods.correctPassword=async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}   
//this is a instance methods i.e available for all documents in a collection
//returns true is the userPassoword is same as the password entered by the Candidate


userSchema.methods.changedPasswordAfter= async function(JWTTimesstamp){
    if(this.passwordChangedAt){
        const changedTimeStamp= (this.passwordChangedAt.getTime()/1000);
        console.log(this.passwordChangedAt, JWTTimesstamp);

        return JWTTimesstamp< changedTimeStamp;
    }
    
    //False means not changed
    return false;
}

userSchema.methods.createPasswordResetToken= async function(){
    const resetToken= crypto.randomBytes(32).toString('hex');

    this.PasswordResetToken= crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.PasswordResetTokenExpires= Date.now()+ 10*60*1000;

    return resetToken;
}


const User = mongoose.models.User || mongoose.model('User',userSchema);
module.exports= User;