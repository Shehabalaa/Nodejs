const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User',new mongoose.Schema({
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
        maxlength:8,
        required:true
    }
}))

function validateUser(user){
    const schema={
        name:Joi.string().min(3).max(7).required(),
        email:Joi.string().required(),
        password:Joi.string().min(3).max(7).required(),
    }
    return Joi.validate(user,schema)
}

exports.validate=validateUser
exports.User=User