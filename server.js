const express = require("express");
const cors = require("cors");

const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
//const PORT = process.env.PORT || 3001;
//const merkle = require('./merkleTree.js');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Recon Rams Test" });
});

// app.get("/api/merkle", (req, res) => {
//     res.json({ message: merkle.getMerkleInfo(req.query.address) });
// });

// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
// });

//require("./app/routes/rr-utility.routes.js")(app);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});