const mongoose = require('mongoose');

module.exports = Object.freeze({
    connect: (uri) => {
        mongoose.connect(uri, {useNewUrlParser: true}).then(()=>{
            console.log("Successefuly connected to database");
        });
    },
    addDoc: (model)=>{
        return model.save();
    },
    rmDoc:(model, id) => {
        return model.deleteOne({ _id: id });
    },
    getDocs:(model) => {
        return model.find();
    },
    getDoc:(model, id) => {
        return model.findById(id);
    },
    editDoc:(model, id, data) => {
        return model.findByIdAndUpdate(id, data, {useFindAndModify:false});
    }
})