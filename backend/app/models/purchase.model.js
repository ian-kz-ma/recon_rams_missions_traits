//This file contains the actual sql query to be executed against the db
//Each table should get its own model detailing the various queries that can be made against it

const sql = require("./db.js");

// constructor
const Purchase = function (params) {
    this.id = params.id;
    this.listing_id = params.listing_id;
    this.wallet = params.wallet;
    this.date = params.date;
};


Purchase.getAllPurchases = (result) => {
    sql.query("SELECT * FROM purchases", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found purchases: ", res);
            result(null, res);
            return;
        }

        // no listings
        result({ kind: "not_found" }, null);
    });
};



module.exports = Purchase;