const express = require('express');
const mongoose = require('mongoose');
const { getAllUsers } = require('./controllers/userController');
require('dotenv/config');
const Users = require('./routes/api/userRoute');

const app = express();

// Bodyparser middleware
app.use(express.json());

const uri = process.env.db;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`Succsessfully connected to DB`);
});
app.get('/', (req, res) => {
  res.send('Haloo');
});

app.use('/users/', getAllUsers)

// app.use('/api/users', Users);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
