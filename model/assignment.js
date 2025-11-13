let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});

AssignmentSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Assignment', AssignmentSchema);
