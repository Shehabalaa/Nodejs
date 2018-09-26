const mongoose = require('mongoose')
const express = require('express')
const router = new express.Router()
const Joi = require('joi')

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log('connected to database'))
    .catch((err)=>console.log(err))

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:10,
        required:true
    }
})
const Genere =  mongoose.model('genres',genreSchema)

router.get('/',async (req,res)=>{
    const genres = await Genere.find().sort('name')
    res.send(genres);
})

router.get('/:id',async (req,res)=>{
    const genres = await Genere.find({_id:parseInt(req.params.id)});
    if(!genres) if(!genres) return res.status(404).send('Course with given id not found')
    res.send(genres[0])
})


router.post('/',async (req,res)=>{
    const genere = Genere(req.body)
    try {
        const result = await genere.save()
        res.send(result)
    } catch (error) {
        if(error) return res.status(400).send('Wrong Name')
    }    
})

router.put('/:id',async (req,res)=>{
    let genre = geners.find({_id:parseInt(req.params.id)});
    if(!genere)
        return res.status(400).send('Wrong ID')
    genre.name =req.body.name
    try {
        const result = await genere.save()
        res.send(result)
    } catch (error) {
        if(error) return res.status(400).send('Wrong Name')
    }  
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