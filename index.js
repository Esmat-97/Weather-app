const express = require('express');
const cors=require('cors')
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error(error);
    }
}

connectToDatabase();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




  
app.post('/', async (req, res) => {
    try {
        const database = client.db("test");
        const collection = database.collection("documents");
        
        const doc = req.body;

        const result = await collection.insertOne(doc);

        // Retrieve the inserted document
        const insertedDoc = await collection.findOne({ _id: result.insertedId });

        // Send back the inserted document as the response
        res.status(200).json([insertedDoc]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error inserting document');
    }
});





// Route to get all documents
app.get('/documents', async (req, res) => {
    try {
        const database = client.db("test");
        const collection = database.collection("documents");

        const documents = await collection.find({}).toArray();
        res.status(200).json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving documents');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
