const listing = require("../models/listing.model.js");
const purchase = require("../models/purchase.model.js");
const jwt = require('jsonwebtoken');

// // Get  listing by id
// exports.getId = (req, res) => {
//     listing.getId(req.params.id, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Unable to get listing with id ${req.params.id}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Error retrieving listing id " + req.params.id
//                 });
//             }
//         } else res.send(data);
//     });
// };

//buy item by listing id, jwt expected in authorization header
exports.buy = async (req, res) => {
    console.log("buy called");
    console.log(req.headers["authorization"]);
    console.log(req.params.wallet);
    console.log(jwt.verify(req.headers["authorization"], "this is the secret key"));
    if (req.headers["authorization"] != null) { 
        let token = jwt.verify(req.headers["authorization"], "this is the secret key")
        if (token.wallet == req.params.wallet) {
            console.log("is this user, buy");
           await listing.buy(req.params.id, req.params.wallet, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Unable to find listing with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error retrieving listing id " + req.params.id
                        });
                    }
                }
                else
                    res.send(data);
            });
        }
    }
    else {
        res.send("no auth token");
    }
};
// Get all marketplace listings
exports.getAllListings = (req, res) => {
    listing.getAll((err, data) => {
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
        }
        else
            res.send(data);
    });
};

// Get all marketplace purchases
exports.getAllPurchases = (req, res) => {
    purchase.getAllPurchases((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Unable to get marketplace purchases."
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving marketplace purchases"
                });
            }
        }
        else
            res.send(data);
    });
};

// // Update marketplace listing by id
// exports.updateId = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//         res.status(400).send({
//             message: "Update requires data."
//         });
//     }

//     console.log(req.body);

//     listing.updateId(
//         req.params.id,

//         new listing(req.body),

//         (err, data) => {
//             if (err) {
//                 if (err.kind === "not_found") {
//                     res.status(404).send({
//                         message: `Unable to find marketplace listing with id ${req.params.id}.`
//                     });
//                 } else {
//                     res.status(500).send({
//                         message: "Error updating marketplace listing with id " + req.params.id
//                     });
//                 }
//             } else res.send(data);
//         }
//     );
// };

