# AI Rivet Search API

This repository contains an Express.js server that serves as an endpoint to interact with a Rivet graph to process queries and return a list of products using MongoDB.

## Overview

The server uses Rivet's capabilities to run a graph that takes user queries, processes them, and executes a search against a MongoDB database to retrieve relevant product information.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB
- Access to Rivet and the relevant plugins

### Installation

1. Clone the repository to your local machine.
2. Run `npm install` to install all the dependencies.
3. Make sure to set up your `.env` file with the following variables:
   - `DB_URL`: Your MongoDB connection string.
   - `GRAPH_ID`: The ID of your Rivet graph.
   - `OPEN_AI_KEY`: Your OpenAI API key.
   - `RIVET_MONGODB_CONNECTION_STRING`: The MongoDB connection string for the Rivet plugin.

### Running the Server

Execute `node server.js` to start the server. It will listen on the defined PORT (default is 3000).

## Usage

Send a POST request to `/aiRivetSearch` with a JSON body containing a `query`. The server will process this query and return a list of products.

Example request:

```json
POST /aiRivetSearch HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
    "query": "Your search query"
}
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
