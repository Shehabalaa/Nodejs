const _=require('lodash')
const bcrypt = require('bcrypt')
const {User} = require('../models/user')
const express = require('express')
const router = express.Router()


  router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email:req.body.email})
    if (!user) return res.status(400).send('Invalid email or password')
    if (user.password !=req.body.password)
        res.status(400).send('Invalid email or password')
    await user.save()
    res.send(true);
  });

  function validate(user){
    const schema={
        email:Joi.string().required(),
        password:Joi.string().min(3).max(7).required(),
    }
    return Joi.validate(user,schema)
}
  

  module.exports = router; 