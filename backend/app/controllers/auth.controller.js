const auth = require("../models/auth.model.js");
const jwt = require('jsonwebtoken');
// Get nonce by wallet
exports.getNonce = (req, res) => {
    auth.getNonce(req.params.wallet, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error retrieving user with wallet " + req.params.wallet
            });
        } else res.send(data);
    });
};

// Verify Signed msg
exports.verifySignedMsg = (req, res) => {
    auth.verifySignedMsg(req.params.wallet, req.params.signedMsg, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error verifying signed msg for wallet " + req.params.wallet
            });
        } else res.send(data);
    });
};

//get user, token auth required
exports.getUser = (req, res) => {
    if (req.headers["authorization"] != null) {
        let token = jwt.verify(req.headers["authorization"], "this is the secret key")
        if (token.wallet == req.params.wallet) {
            auth.getUser(req.params.wallet, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: "Error getting user for wallet" + req.params.wallet
                    });
                } else res.send(data);
            })
        }
    }
}
// Update auth listing by id
exports.updateId = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Update requires data."
        });
    }

    console.log(req.body);

    auth.updateId(
        req.params.id,

        new auth(req.body),

        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Unable to find auth listing with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating auth listing with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

