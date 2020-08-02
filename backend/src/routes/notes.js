import { Router } from 'express';
const router = Router();

import { getNotes, createNote, getNote, updateNote, deleteNote } from '../controllers/notes.controller';

router.route('/')
    .get(getNotes)
    .post(createNote)

router.route('/:id')
    .get(getNote)
    .put(updateNote)
    .delete(deleteNote)

module.exports = router