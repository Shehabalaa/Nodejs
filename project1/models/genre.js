const mongoose = require('mongoose')
const Joi = require('joi')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v && v.length > 3 && v.length < 10
            }
        }
    }
})

const Genre = mongoose.model('genres', genreSchema)

function validateGenre(genre){   
    const schema = {
        name : Joi.string().min(3).max(10).required()
    };
    return Joi.validate(genre, schema);
}


module.exports.Genre = Genre
module.exports.validate = validateGenre