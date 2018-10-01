const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v && v.length > 5 && v.length < 10
            }
        }
    },
    isGold: {
        type: Boolean,
        defualt:false
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v && v.length > 5 && v.length < 10
            }
        }
    }
})

const Customer = mongoose.model('customers', customerSchema)

function validateCustomer(customer){   
    const schema = {
        name : Joi.string().min(3).max(10).required(),
        phone : Joi.string().min(3).max(10).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer
module.exports.validate = validateCustomer