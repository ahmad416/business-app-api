const Joi = require('@hapi/joi');
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength : 6,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
})
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id}, config.get("jwtPrivateKey.jwtKey"))
    return token
}
const User = mongoose.model('User', userSchema)

function validateUser(user){
    const Schema ={
        name: Joi.string().min(5).max(30).required(),
        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, Schema)
}

exports.User = User
exports.validate = validateUser