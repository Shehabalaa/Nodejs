const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('connected...'))
.catch((err)=> console.error(err))