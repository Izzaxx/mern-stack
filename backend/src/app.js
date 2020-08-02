import express from 'express';
import cors from 'cors';

import users from './routes/users';
import notes from './routes/notes';

const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', users);
app.use('/api/notes', notes);


module.exports = app;