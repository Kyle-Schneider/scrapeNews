var mongoose = require("mongoose");

var Schema = mongoose.Schema;

NoteSchema = new Schema ({
  
    body: String
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;