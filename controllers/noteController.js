const Note = require("../models/Note");

module.exports.addNote = async (req, res) => {
    const { user, note } = req.body;
    try {
      const savedNote = await Note.create({user, note});
      res.status(201).json(savedNote);
      res.send('note added');
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}

module.exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

module.exports.getNotesByUser = async (req, res) => {
    const { user } = req.body;
    try {
      const notes = await Note.find({ user });
      if (!notes.length) {
        return res.status(404).json({ error: 'No notes found for this user' });
      }
      res.status(200).json(notes);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}

module.exports.deleteNote = async (req, res) => {
    const { id } = req.body;
    try {
      const deletedNote = await Note.findByIdAndDelete(id);
      if (!deletedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}
