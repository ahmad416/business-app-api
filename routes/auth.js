const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const { User } = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.post('/',async (req,res) => {
    const { error } = validateUser(req.body)
    if ( error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email})
    if(!user) return res.status(400).send('Incorrect Username or Password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Incorrect Username or Password')

     const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user,['_id','name','email']))
})

function validateUser(req){
    const Schema ={
        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, Schema)
}

module.exports = router