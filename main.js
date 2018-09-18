const express = require('express')
const app = new express()
const Joi = require('joi')
app.use(express.json());

const geners=[{id:1,name:'horror'},{id:2,name:'comedy'},{id:3,name:'action'}]
app.listen(3000,()=>console.log("Listening..."))

app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.get('/api/geners',(req,res)=>{
    res.send(geners);
})

app.get('/api/geners/:id',(req,res)=>{
    let genere = geners.find((obj)=> obj.id === parseInt(req.params.id));
    if(!genere) if(!genere) return res.status(404).send('Course with given id not found')
    res.send(genere)
})

app.post('/api/geners',(req,res)=>{
    const shcema={name:Joi.string().min(3).max(10).required()}
    const result = Joi.validate(req.body,shcema)
    if(result.error) return res.status(400).send('Wrong Name')
    const genere={
        id:geners.length+1,
        name:req.body.name
    }   
    geners.push(genere)
    res.send(genere)
})

app.put('/api/geners/:id',(req,res)=>{
    let genere = geners.find((obj)=> obj.id === parseInt(req.params.id));
    genere.name =req.body.name
    res.send(genere)
})

app.delete('/api/geners/:id',(req,res)=>{
    let genere = geners.find((obj)=> obj.id === parseInt(req.params.id));
    if(!genere) return res.status(404).send('Course with given id not found')

    let indx = geners.indexOf(genere);
    geners.splice(indx,1)

    res.send(genere)
    console.log(geners)
})