# AI Rivet Search API

This repository contains an Express.js server that serves as an endpoint to interact with a [Rivet](https://rivet.ironcladapp.com/) graph to process queries and return a list of products using MongoDB. This is a complimintery repository for Article : [Building AI Graphs with Rivet and MongoDB Atlas Vector Search to Power AI Applications](https://www.mongodb.com/developer/products/atlas/atlas-rivet-graph-ai-integ/). Additionally, there are 2 simple graphs that can be run through Rivet's UI tool.

## Overview

The server uses Rivet's capabilities to run a graph that takes user queries, processes them, and executes a search against a MongoDB database to retrieve relevant product information.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB Atlas 
- Access to Rivet and the relevant plugins

**Complete steps 1-5 from the AI-Shop github tutorial** : https://github.com/mongodb-developer/ai-shop


### Installation

To run the Rivet Graphs from the UI follow the instructions to [install Rivet](https://rivet.ironcladapp.com/docs/getting-started/installation) and [Setup](https://rivet.ironcladapp.com/docs/getting-started/setup) OpenAI key and the MongoDB Plugin. Once installed import the project file into Rivet.

To run the server side please follow:

1. Clone the repository to your local machine.
2. Run `npm install` to install all the dependencies.
3. Make sure to set up your `.env` file with the following variables:
   - `DB_URL`: Your MongoDB connection string.
   - `GRAPH_ID`: The ID of your Rivet graph ("puzj17gj_xu56GUlr7164").
   - `OPEN_AI_KEY`: Your OpenAI API key.
   - `RIVET_MONGODB_CONNECTION_STRING`: The MongoDB connection string for the Rivet plugin.

### Running the Server

Execute `npm run server` to start the server. It will listen on the defined PORT (default is 3000).

## Usage

Send a POST request to `/aiRivetSearch` with a JSON body containing a `query`. The server will process this query and return a list of products.

Example request:

```
POST /aiRivetSearch HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
   // eg. "Banana and Milk" or "Lasagne reciepe"
    "query": "Your search query"
}
```

```shell
curl -X POST http://localhost:3000/aiRivetSearch \
-H "Content-Type: application/json" \
-d '{"query": "Banana and Milk"}'
```

You will receive a response with the search results, the original search list, and the pipeline used for the MongoDB aggregation.

### Features
- Integration with Rivet for graph processing.
- MongoDB aggregation for efficient data retrieval.
- CORS enabled for cross-origin requests.
- Body parsing for easy access to request payload.


## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
If you have any questions or comments, please open an issue on this repository.
