const express = require('express')
const app = new express()
const geners = require('./routes/geners')
const home = require('./routes/home')

app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}))
app.use('/api/geners',geners)
app.use('/',home)

app.listen(3000,()=>console.log("Listening..."))
