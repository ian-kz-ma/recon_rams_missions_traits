const Test = require("../models/test.model.js");
const jwt = require('jsonwebtoken');

// Create and Save a new test
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a test entry
    const testEntry = new Test({
        id: req.body.id,
        name: req.body.name,
        age: req.body.age 
    });

    // Save test in the database
    Test.create(testEntry, (err, data) => {
    if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
        });
    else res.send(data);
    });
};

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
    console.log(jwt.verify(req.headers["authorization"],"this is the secret key" ));
    if(req.headers["authorization"] != null) {
        if(jwt.verify(req.headers["authorization"],"this is the secret key" )) {
            Test.findById(req.params.id, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Unable to get test with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error retrieving test with id " + req.params.id
                        });
                    }
                } else res.send(data);
            });
        }
    }

};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Test.updateById(
        req.params.id,
        new Test(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Unable to find Tutorial with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating test with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Test.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Unable to find test with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete test with id " + req.params.id
                });
            }
        } else res.send({ message: `Test was deleted successfully!` });
    });
};

