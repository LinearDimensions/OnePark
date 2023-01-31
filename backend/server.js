const express = require('express');
const helper = require('./helper');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open',()=> {
  console.log("MongoDB database connection established succesfully")
})

const reportRouter = require('./routes/report');
app.use('/report', reportRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})