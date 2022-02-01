//When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE),
//we need to determine how the server will response. This is required in server.js.

module.exports = app => {
    const test = require("../controllers/test.controller.js");

    var router = require("express").Router();

    // Create a new test entry
    router.post("/", test.create);

    // Retrieve test by id
    router.get("/:id", test.findOne);

    // Update a test by id
    router.put("/:id", test.update);

    // Delete a test by id
    router.delete("/:id", test.delete);

    //*** BASE URI REQUIRED FOR EVERY API CALL ***
    //
    //Example api call to get test by id:
    //
    //GET http://localhost:8080/api/test/42
    //
    app.use('/api/test', router);
};