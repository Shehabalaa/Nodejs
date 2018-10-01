const {Customer ,validate} = require('../models/customer')
const express = require('express')
const router = new express.Router()

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().sort('name')
        res.send(customers);
    } catch (error) {
        return res.status(404).send('Nothing found in database')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById( req.params.id)
        if(!customer)  return res.status(404).send('ID not found in database')
        res.send(customer)
    } catch (error) {
        return res.status(404).send('ID shoud be 24 char')
    }
})


router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error)  return res.status(400).send(error.details[0].message)

    const customer = new Customer(req.body)
    try {
        const result = await customer.save()
        res.send(result)
    } catch (error) {
        if (error) return res.status(400).send('Wrong Name')
    }
})

router.put('/:id', async (req, res) => {
    try {
        const {error} = validate(req.body)
        if(error)  return res.status(400).send(error.details[0].message)
        const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!customer) return res.status(404).send('ID Not Found')
        res.send(customer)
    } catch (error) {
        if (error) return res.status(400).send('ID shoud be 24 char')
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id)
        if (!customer) return res.status(400).send('Course with given id not found')
        res.send(customer)
    } catch (error) {
        if (error) return res.status(400).send('ID shoud be 24 char')
    }

})

module.exports = router