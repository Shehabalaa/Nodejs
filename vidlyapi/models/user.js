const Joi = require('joi');
const config = require('config')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:7,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        minlength:3,
        required:true
    }
})
userSchema.methods.generateAuthToken=function(){
    return jwt.sign({_id:this._id},config.get('jwtPrivateKey'))
}

const User = mongoose.model('User',userSchema)

function validateUser(user){
    const schema={
        name:Joi.string().min(3).max(7).required(),
        email:Joi.string().required(),
        password:Joi.string().min(3).required(),
    }
    return Joi.validate(user,schema)
}

exports.validate=validateUser
exports.User=User