const express = require("express");
const cors = require("cors");

const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
  res.json({ message: "Test Response Success" });
});

// main routes
require("./app/routes/test.routes.js")(app);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});