var mongoose = require("mongoose")
// the new schema definition
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
})
//compile the new schema to model, export that model to use in other file
module.exports = mongoose.model("Comment",commentSchema)