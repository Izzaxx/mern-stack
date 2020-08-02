const notesCtrl = {};

import Note from '../models/Note'

// Without ID
// Find All Notes
notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
}

// Create Note
notesCtrl.createNote = async (req, res) => {
    const { title, description, date , author } = req.body;
    const newNote = new Note({
        title,
        description,
        date,
        author,
    })
    await newNote.save()
    res.json({ message: 'Notes saved' });
}

// With ID
// Find one Note
notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note)
}

// Update a Note
notesCtrl.updateNote = async (req, res) => {
    const {title, description, author} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {
        title,
        description,
        author,
    })
    res.json({ message: 'Note updated' })
}

// Delete a Note
notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note Delete' })
}

module.exports = notesCtrl;