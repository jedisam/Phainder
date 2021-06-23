const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const Lists = require('./routes/api/lists')

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = process.env.db;
 mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true  })
 const connection = mongoose.connection
connection.once('open',()=>{
    console.log(`Succsessfully connected to DB`)
})
app.get('/',(req,res)=>{
  res.send('Haloo')
})

app.use('/api/lists',Lists);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
