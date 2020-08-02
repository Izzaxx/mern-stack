import { Router } from 'express';
const router = Router();

import { createUsers, getUsers, deleteUser } from '../controllers/users.controller';

router.route('/')
    .get(getUsers)
    .post(createUsers)

router.route('/:id')
    .delete(deleteUser)

module.exports = router