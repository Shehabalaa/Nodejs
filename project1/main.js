const express = require('express')
const mongoose = require('mongoose')
const app = new express()
const geners = require('./routes/genres')
const customers = require('./routes/customers')
const home = require('./routes/home')

app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}))
app.use('/api/genres',geners)
app.use('/api/customers',customers)
app.use('/',home)

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log('connected to database'))
    .catch((err)=>console.log(err))

app.listen(3000,()=>console.log("Listening..."))
