const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors'); 
const app = express();
const port = 5000;

connectToMongo();

app.use(cors()); // Use CORS middleware here

app.use(express.json()); 

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

console.log("Server is running...");
