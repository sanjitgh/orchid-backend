const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// middelware
app.use(cors());
app.use(express.json())



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bdxj8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ph10.ehebq.mongodb.net/?retryWrites=true&w=majority&appName=ph10`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const movieCollection = client.db("movieDB").collection("movies");

    // create movie in db
    app.post('/movies', async (req, res) => {
      const movies = req.body;
      const result = await movieCollection.insertOne(movies);
      res.send(result);
    })

    // read movie from db
    app.get("/movies", async (req, res) => {
      const cursor = movieCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// root view on server is run
app.get("/", (req, res) => {
  res.send("Server is runing")
})

app.listen(port, () => {
  console.log(`Server is runing on port: ${port}`);
})