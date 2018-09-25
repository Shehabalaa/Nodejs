const express = require('express')
const router = new express.Router()
const Joi = require('joi')

const geners=[
{id:1,name:'horror'},
{id:2,name:'comedy'},
{id:3,name:'action'}]

router.get('/',(req,res)=>{
    res.send(geners);
})

router.get('/:id',(req,res)=>{
    let genere = geners.find((obj)=> obj.id === parseInt(req.params.id));
    if(!genere) if(!genere) return res.status(404).send('Course with given id not found')
    res.send(genere)
})

router.post('/',(req,res)=>{
    const shcema={name:Joi.string().min(3).max(10).required()}
    const {error} = Joi.validate(req.body,shcema)
    if(error) return res.status(400).send('Wrong Name')
    const genere={
        id:geners.length+1,
        name:req.body.name
    }   
    geners.push(genere)
    res.send(genere)
})

router.put('/:id',(req,res)=>{
    let genere = geners.find((obj)=> obj.id === parseInt(req.params.id));
    genere.name =req.body.name
    res.send(genere)
})

router.delete('/:id',(req,res)=>{
    let genere = geners.find((obj)=> obj.id === parseInt(req.params.id));
    if(!genere) return res.status(404).send('Course with given id not found')

    let indx = geners.indexOf(genere);
    geners.splice(indx,1)

    res.send(genere)
    console.log(geners)
})

module.exports = router