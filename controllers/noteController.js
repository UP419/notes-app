const Note = require("../models/Note");
const jwt = require('jsonwebtoken');
const User = require('../models/User');


module.exports.addNote = async (req, res) => {
    const { note } = req.body;
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'this is jwt secred string', async (err, decodedToken) => {
          if (err) {
            res.locals.user = null;
            next();
          } else {
            let user = await User.findById(decodedToken.id);
            try {
                const savedNote = await Note.create({user: user.email, note});
                res.status(201).json(savedNote);
                console.log('new note added');
              } catch (err) {
                res.status(400).json({ error: err.message });
              }       
          }
        });
    }
}

module.exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        console.log(notes);
        res.status(200).json(notes);
        
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

module.exports.getNotesByUser = async (req, res) => {
    const token = req.cookies.jwt;
    console.log('');
    if (token) {
        jwt.verify(token, 'this is jwt secred string', async (err, decodedToken) => {
          if (err) {
            res.locals.user = null;
            next();
          } else {
            let user = await User.findById(decodedToken.id);
            try {
                console.log(user.email);
                const notes = await Note.find({ user: user.email });
                console.log('notes found');
                console.log(notes);
                if (!notes.length) {
                  return res.status(404).json({ error: 'No notes found for this user' });
                }
                res.status(200).json(notes);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }       
          }
        });
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
