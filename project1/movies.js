const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/vidly")
.then(()=>console.log('connected to database'))
.catch((err)=>console.log(err))


const genreSchema = new mongoose.Schema({name:String})
const movieSchema = new mongoose.Schema({
    title:String,
    genres:[genreSchema],
    numinStock:Number,
    dailyRentalRate:Number
})
const Movie =  mongoose.model('Movie',movieSchema)
function addMovie(name,numinStock,dailyRentalRate,genres){
    let movie = new Movie({
        title:name,
        genres:genres,
        numinStock:numinStock,
        dailyRentalRate:dailyRentalRate
    })
    console.log(movie)
}

addMovie('hhh',13,42,[ {name:'comedy'}, {name:'romance'}])
let b={name:"hello",n:"123"}
let a={name:"notHello",num:"not123"}
a=b
console.log(a)