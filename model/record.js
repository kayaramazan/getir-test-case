let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//records schema definition
let RecordsSchema = new Schema(
  {
    _id: { type: String, required: true },
    key: { type: String},
    counts: { type: Array}, 
    createdAt: { type: Date},
  }
);

 
//Exports the RecordSchema for use elsewhere.
module.exports = mongoose.model('records', RecordsSchema);