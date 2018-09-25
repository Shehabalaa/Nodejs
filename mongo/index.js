const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected...'))
    .catch((err) => console.error(err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, defualt: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)
async function createCourse() {
const course = new Course({
    name: 'angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true
})
    
    const result = await course.save()
    console.log(result)
}



async function updateCourse(){
    const result =await Course.find();
    console.log(result)
}

