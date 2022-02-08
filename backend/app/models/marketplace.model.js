//This file contains the actual sql query to be executed against the db
//Each table should get its own model detailing the various queries that can be made against it

const sql = require("./db.js");

// constructor
const Marketplace = function(params) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.initStock = params.initStock;
    this.currentStock = params.currentStock;
    this.cost = params.cost;
    this.imageUrl = params.imageUrl;
    this.collectedWallets = params.collectedWallets;
};


Marketplace.getId = (id, result) => {
    sql.query(`SELECT * FROM marketplace WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found listing: ", res[0]);
            result(null, res[0]);
            return;
        }

        // Could not find listing
        result({ kind: "not_found" }, null);
    });
};

Marketplace.getAll = (result) => {
    sql.query("SELECT * FROM marketplace", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }

        if (res.length) {
        console.log("found listings: ", res[0]);
        result(null, res[0]);
        return;
        }

        // no listings
        result({ kind: "not_found" }, null);
    });
};

Marketplace.updateId = (id, obj, result) => {
    sql.query(
        "UPDATE marketplace SET name = ?, description = ?, initStock = ?, currentStock = ?, cost = ?, imageUrl = ?, collectedWallets = ? WHERE id = ?",
        [obj.name, obj.description, obj.initStock, obj.currentStock, obj.cost, obj.imageUrl, obj.collectedWallets, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Marketplace with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated marketplace: ", { id: id, ...obj });
            result(null, { id: id, ...obj });
    });
};





module.exports = Marketplace;