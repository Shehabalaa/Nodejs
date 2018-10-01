const {Genre ,validate} = require('../models/genre')
const express = require('express')
const router = new express.Router()


router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().sort('name')
        res.send(genres);
    } catch (error) {
        return res.status(404).send('Nothing found in database')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById( req.params.id)
        if(!genre)  return res.status(404).send('ID not found in database')
        res.send(genre)
    } catch (error) {
        return res.status(404).send('ID shoud be 24 char')
    }
})


router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error)  return res.status(400).send(error.details[0].message)

    const genre = Genre(req.body)
    try {
        const result = await genre.save()
        res.send(result)
    } catch (error) {
        if (error) return res.status(400).send('Wrong Name')
    }
})

router.put('/:id', async (req, res) => {
    try {
        const {error} = validate(req.body)
        if(error)  return res.status(400).send(error.details[0].message)
        const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!genre) return res.status(404).send('ID Not Found')
        res.send(genre)
    } catch (error) {
        if (error) return res.status(400).send('ID shoud be 24 char')
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id)
        if (!genre) return res.status(400).send('Course with given id not found')
        res.send(genre)
    } catch (error) {
        if (error) return res.status(400).send('ID shoud be 24 char')
    }

})

module.exports = router