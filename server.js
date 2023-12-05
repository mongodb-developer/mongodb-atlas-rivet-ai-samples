require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const {
    GraphId,
    GraphInputs,
    GraphOutputs,
    coerceType,
    currentDebuggerState,
    loadProjectFromFile,
    runGraph,
    globalRivetNodeRegistry,
  } = require('@ironclad/rivet-node');

  const Rivet = require("@ironclad/rivet-node");

let RivetMongodbPlugin;

(async () => {
  RivetMongodbPlugin = (await import("rivet-plugin-mongodb")).default;
  globalRivetNodeRegistry.registerPlugin(RivetMongodbPlugin(Rivet));
})();

 

// Constants
const PORT = 3000;
const DB_URL = process.env.DB_URL;
const DB_NAME = 'ai_shop';

// Variables
let db = null;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection function
const connectToDb = async () => {
    if (db) return db;   
    const client = new MongoClient(DB_URL);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(DB_NAME);
    return db;
};


app.post('/aiRivetSearch', async (req, res) => {

    // Connect to MongoDB
    db = await connectToDb();

    

    // Extract search query from the request
    const { query } = req.body;

    console.log(query);
    console.log(process.env.GRAPH_ID);
    console.log("Before running graph");

    const project = await loadProjectFromFile('./MongoDB-Atlas-Rivet-Project-Examples.rivet-project');
   const response = await runGraph(project, { graph: process.env.GRAPH_ID,
    openAiKey : process.env.OPEN_AI_KEY,
    inputs : {
       input : {
        type: "string",
        value: query
       }
      }  ,
    pluginSettings: {
        rivetPluginMongodb: {
            mongoDBConnectionString: process.env.RIVET_MONGODB_CONNECTION_STRING,
        }}
    });
    

    console.log(response.result.value);
    console.log(response.list.value);

    const pipeline = JSON.parse(response.result.value);

    const collection = db.collection('products');
    const result = await collection.aggregate(pipeline).toArray();
    
    // Respond with results
    res.json({ "result": result, "searchList": response.list.value, prompt: query, pipeline: pipeline });


});



app.listen(PORT);







