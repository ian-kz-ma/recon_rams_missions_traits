module.exports = app => {
    const marketplace = require("../controllers/marketplace.controller.js");

    var router = require("express").Router();

    // Get marketplace listing by id
    // router.get("/:id", marketplace.getId);

    // Get all active marketplace listings 
    router.get("/listings", marketplace.getAllListings)

    // Get all marketplace purchases
    router.get("/purchases", marketplace.getAllPurchases)


  router.put("/buy/:id/:wallet",  marketplace.buy);
    // Update a marketplace listing
    // router.put("/:id", marketplace.updateId);

    //*** BASE URI REQUIRED FOR EVERY API CALL ***
    //
    //Example api call to get marketplace listing by id:
    //
    //GET http://localhost:8080/api/marketplace/42
    //
    app.use('/api/marketplace', router);
};