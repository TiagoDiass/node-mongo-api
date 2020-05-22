const express = require('express');
const app = express();
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');

app.use(express.json());
app.use('/users', usersRoutes);

// Connecting to the database
mongoose.connect(
    'mongodb://localhost/users-crud-api', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

const db = mongoose.connection;
db.on('error', (error) => console.log(`[server] Error in connecting to the database: ${error}`));
db.once('open', () => console.log('[server] Connected to the database...'))

app.listen(3333, () => {
    console.log('[server] Server is running on port 3333...');
})