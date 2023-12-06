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


// Define a new POST endpoint for handling AI-enhanced search with Rivet
app.post('/aiRivetSearch', async (req, res) => {

    // Connect to MongoDB using a custom function that handles the connection logic
    db = await connectToDb();

    // Extract the search query sent in the POST request body
    const { query } = req.body;

    // Logging the query and environment variables for debugging purposes
    console.log(query);
    console.log(process.env.GRAPH_ID);
    console.log("Before running graph");

    // Load the Rivet project graph from the filesystem to use for the search
    const project = await loadProjectFromFile('./server/ai_shop.graph.rivet-project');

    // Execute the loaded graph with the provided inputs and plugin settings
    const response = await runGraph(project, { 
        graph: process.env.GRAPH_ID,
        openAiKey: process.env.OPEN_AI_KEY,
        inputs: {
            input: {
                type: "string",
                value: query
            }
        },
        pluginSettings: {
            rivetPluginMongodb: {
                mongoDBConnectionString: process.env.RIVET_MONGODB_CONNECTION_STRING,
            }
        }
    });


    // Parse the MongoDB aggregation pipeline from the graph response
    const pipeline = JSON.parse(response.result.value);

    // Connect to the 'products' collection in MongoDB and run the aggregation pipeline
    const collection = db.collection('products');
    const result = await collection.aggregate(pipeline).toArray();
    
    // Send the search results back to the client along with additional context
    res.json({ 
        "result": result, 
        "searchList": response.list.value, 
        prompt: query, 
        pipeline: pipeline 
    });

});



app.listen(PORT);







