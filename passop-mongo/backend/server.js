const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv =require('dotenv')
const bodyparser = require('body-parser')
const app = express()
const cors = require('cors')

dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'PassOP';
const port = 3000
app.use(bodyparser.json())
app.use(cors())

 client.connect();

 /// get all passswords

app.get('/',async(req, res) => {
    const db = client.db(dbName);
  const collection = db.collection('Passwords');
    const findResult = await collection.find({}).toArray();
  res.json (findResult)
})

// Save passwords

app.post('/',async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
  const collection = db.collection('Passwords');
    const findResult = await collection.insertOne(password);
  
  res.send({success: true , result:findResult})
})


//Delete Passwords by id

app.delete('/',async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
  const collection = db.collection('Passwords');
    const findResult = await collection.deleteOne(password);
  
  res.send({success: true , result:findResult})
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})   
