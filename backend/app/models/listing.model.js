//This file contains the actual sql query to be executed against the db
//Each table should get its own model detailing the various queries that can be made against it
const { v4: uuidv4 } = require("uuid");
const sql = require("./db.js");

// constructor
const Listing = function (params) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.initStock = params.init_stock;
    this.current_stock = params.current_stock;
    this.price = params.price;
    this.image_url = params.image_url;
    this.listing_time = paramls.listing_time;
};


// Listing.getId = (id, result) => {
//     sql.query(`SELECT * FROM listings WHERE id = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found listing: ", res[0]);
//             result(null, res[0]);
//             return;
//         }

//         // Could not find listing
//         result({ kind: "not_found" }, null);
//     });
// };

Listing.getAll = (result) => {
    sql.query("SELECT * FROM listings", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
           
            // console.log(res);
            let listings = [];
            res.forEach(x => {
                if(x.enabled == 1 && x.listing_time < new Date()) {
                    listings.push(x);
                }
            })
           
            console.log("found listings: ", listings);
            result(null, listings);
            return;
        }

        // no listings
        result({ kind: "not_found" }, null);
    });
};

Listing.buy = (id, wallet, result) => {
    //select user record
    sql.query(`SELECT * FROM users WHERE wallet = '${wallet}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            let user = res[0];
            //select listing record
            sql.query(`SELECT * FROM listings WHERE id = ${id}`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                if (res.length) {
                    let listing = res[0];
                    let listingEnabled = listing.enabled == 1;
                    let inStock = listing.current_stock > 0;
                    let canAfford = user.token_balance > listing.price;
                    let hasStarted = new Date() > listing.listing_time;
                    let purchases = [];
                    let alreadyPurchased = false;

                    let id = uuidv4();

                    console.log(id);
                    if (listingEnabled && inStock && canAfford && hasStarted) {
                        sql.query(`SELECT * FROM purchases WHERE listing_id = ${listing.id}`, (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                result(err, null);
                                return;
                            }
                            if (res.length) {
                                purchases = res;
                                purchases.forEach(purchase => {
                                    if (purchase.wallet == wallet) {
                                        alreadyPurchased = true;
                                    }
                                    else {
                                        result(null, false);
                                    }
                                })
                            }
                            if (purchases.length < listing.init_stock && !alreadyPurchased) {
                                console.log("insert new purchase, then update user and listing");
                                sql.query(
                                    `INSERT INTO purchases SET id = '${id}', listing_id = ${listing.id}, wallet = '${wallet}', date = '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`,
                                    (err, res) => {

                                        if (err) {
                                            console.log("error: ", err);
                                            result(err, null);
                                            return;
                                        }

                                        else {
                                            console.log("Success"); 
                                            sql.query( `UPDATE users SET token_balance = ${user.token_balance - listing.price} WHERE wallet = '${wallet}'`, (err, res) => {
                                                sql.query( `UPDATE listings SET current_stock = ${listing.current_stock - 1} WHERE id = ${listing.id}`, (err, res) => {
                                                    console.log("updated user and listing");
                                                });

                                            });

                                            //update user balance
                                            //update listing stock     
                                            result(null, true);
                                        }
                                    });


                            }
                            else {
                                result(null, false);
                            }
                        });
                    }

                }
                else {
                    //listing not found
                    result({ kind: "not_found" }, null);
                    return;
                }
            })

        }
    })
}
// Listing.updateId = (id, obj, result) => {
//     sql.query(
//         "UPDATE marketplace SET name = ?, description = ?, init_stock = ?, current_stock = ?, price = ?, image_url = ?, listing_time = ? WHERE id = ?",
//         [obj.name, obj.description, obj.init_stock, obj.current_stock, obj.price, obj.image_url, obj.listing_time, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found Marketplace with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated marketplace: ", { id: id, ...obj });
//             result(null, { id: id, ...obj });
//         });
// };





module.exports = Listing;