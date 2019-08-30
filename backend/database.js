const mongoose = require('mongoose');

module.exports = Object.freeze({
    connect: (uri) => {
        mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
            console.log("Successefuly connected to database");
        });
    },
    addDoc: (model) => {
        return model.save();
    },
    rmDoc: (model, id) => {
        return model.deleteOne({ _id: id });
    },
    getDocs: (model, filter = {}) => {
        return model.find(filter);
    },
    getDocsBy: (model, filter) => {
        return model.findOne(filter);
    },
    getDocByID: (model, id) => {
        return model.findById(id);
    },
    editDoc: (model, id, data) => {
        return model.findByIdAndUpdate(id, data, { useFindAndModify: false })
    }
})