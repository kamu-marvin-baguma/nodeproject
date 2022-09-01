const mongoose = require("mongoose")
//the name of the input must be the same as the schema
//schema and model
const workerSchema =  mongoose.Schema({
    name: String,
    field: String,
    age: Number,
    salary: Number,
})

module.exports = mongoose.model("worker", workerSchema)