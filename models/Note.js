const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true, 
  },
  note: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, 
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
