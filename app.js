const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors'); // Add this line
app.use(cors());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hospital', {useNewUrlParser: true, useUnifiedTopology: true});
// const db = mongoose.connection;
const recordSchema = mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    mobileno: Number,
    address: String,

})
const Record = mongoose.model('Record', recordSchema);
app.get('/', async (req, res)  => {
    console.log(await Record.find());
  res.send(await Record.find());
});
app.post('/add', async (req, res) => {

  console.log(req);
    const record = new Record({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        mobileno: req.body.mobileno,
        address: req.body.address,
    });

    await record.save();

    res.send(record);

  });
app.listen(3000, () => { 
  console.log('Server is running at port 3000');
});