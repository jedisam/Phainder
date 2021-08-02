const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const Users = require('./routes/api/userRoute');
const Pharmas = require('./routes/api/pharmaRoute');

const app = express();

// Bodyparser middleware
app.use(express.json());

const uri = process.env.db;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`Succsessfully connected to DB`);
});
app.get('/', (req, res) => {
  res.send('Haloo');
});

app.use('/api/users', Users);
app.use('/api/pharmas', Pharmas);
app.use('/api/medications', Pharmas);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
