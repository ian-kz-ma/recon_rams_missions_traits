module.exports = app => {
    const auth = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    // Get auth listing by wallet, create user if does not exist
    router.post("/getNonce/:wallet", auth.getNonce);

    //Verify signed msg and return session token;
    router.get("/verifySignedMsg/:wallet/:signedMsg", auth.verifySignedMsg);

    //get user, expects token auth header
    router.get("/getUser/:wallet", auth.getUser)

    // Update a auth listing
    // router.put("/:id", auth.updateId);

    //*** BASE URI REQUIRED FOR EVERY API CALL ***
    //
    //Example api call to get auth listing by id:
    //
    //GET http://localhost:8080/api/auth/42
    //
    app.use('/api/auth', router);
};