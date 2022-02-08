const marketplace = require("../models/marketplace.model.js");

// Get marketplace listing by id
exports.getId = (req, res) => {
    marketplace.getId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Unable to get marketplace listing with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving marketplace listing id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Get all marketplace listings
exports.getAll = (req, res) => {
    marketplace.getAll((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Unable to get marketplace listings."
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving marketplace listings" 
                });
            }
        } else res.send(data);
    });
};

// Update marketplace listing by id
exports.updateId = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Update requires data."
        });
    }

    console.log(req.body);

    marketplace.updateId(
        req.params.id,

        new marketplace(req.body),
        
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Unable to find marketplace listing with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating marketplace listing with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

