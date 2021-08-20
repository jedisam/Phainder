const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const Users = require('./routes/api/userRoute');
const Pharmas = require('./routes/api/pharmaRoute');
const Medications = require('./routes/api/medicationRoute');
const Prescription = require('./routes/api/prescriptionRoute');

const app = express();

// Bodyparser middleware
app.use(express.json());

// enable cors
app.use(cors());

// Connect to DataBase
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

// Different routes
app.get('/', (req, res) => {
  res.send('Haloo');
});
app.use('/api/users', Users);
app.use('/api/pharmas', Pharmas);
app.use('/api/medications', Medications);
app.use('/api/prescriptions', Prescription);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

module.exports = app;
