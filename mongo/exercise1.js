const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('connected...'))
    .catch((err) => console.log(err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, defualt: Date.now },
    isPublished: Boolean,
    price:Number
})
console.log(['hello','hi']==['hello'])
const Course = mongoose.model('courses', courseSchema)

async function getCourses() {
    const result = await Course.find({ isPublished: true})
    .or([{price:{$gte:15}},{name:/.*by.*/}])
    console.log(result)
}
getCourses()