const express = require('express');
const postsRouter = require('./routes/posts');
const db = require('./database')
const app = express();

// db.connect("mongodb+srv://dbUser:dbUserPassword@cluster0-9zvvw.mongodb.net/test?retryWrites=true&w=majority");
db.connect("mongodb://localhost/posts");

app.use(express.json());
app.use('/api/posts', postsRouter);
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Listening at port 3000 !!!");
});


module.exports = app;