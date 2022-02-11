//This file contains the actual sql query to be executed against the db
//Each table should get its own model detailing the various queries that can be made against it
const util = require('ethereumjs-util');
const jwt = require('jsonwebtoken');
const generateRandomString = (myLength) => {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
    const randomString = randomArray.join("");
    return randomString;
}
const toHex = (stringToConvert) => {
    return stringToConvert
        .split('')
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
}

const e = require("express");
const sql = require("./db.js");
const Web3 = require('Web3');
const { bufferToHex } = require('ethereumjs-util');
let web3 = new Web3(new Web3.providers.HttpProvider('https://****/'));
// constructor
const User = function (params) {
    this.wallet = params.wallet;
    this.nonce = params.nonce;
    this.token_balance = params.token_balance;
    this.rams_owned = params.rams_owned;
};

User.getUser = (wallet, result) => {

    sql.query(`SELECT * FROM users WHERE wallet = '${wallet}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
    });
}

User.getNonce = (wallet, result) => {
    sql.query(`SELECT * FROM users WHERE wallet = '${wallet}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            // let nonce = `0x${toHex(generateRandomString(15))}`;
            let nonce = generateRandomString(15);
            res[0].nonce = nonce;
            console.log("found user: ", res[0]);
            sql.query(`UPDATE users SET nonce = "${nonce}" WHERE wallet = '${wallet}'`, (err, res) => {
                if (err) {
                    console.log("error updating nonce: ", err);
                    result(null, err);
                    return;
                }

                console.log("updated nonce on user record");
                result(null, { nonce: nonce });
            });

            return;
        }
        else {
            console.log("user does not exist");  // Could not find listing
            let nonce = generateRandomString(15);
            sql.query(`INSERT INTO users SET wallet = '${wallet}', nonce = '${nonce}',
            token_balance=0, rams_owned = "[]"`, (err, res) => {
                if (err) {
                    console.log("error creating user record: ", err);
                    result(null, err);
                    return;
                }
            });
            console.log("created user record");
            result(null, { nonce: nonce });
            return;
        }

    });
};


User.verifySignedMsg = (wallet, signedMsg, result) => {
    sql.query(`SELECT * FROM users WHERE wallet = '${wallet}'`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            let nonce = `0x${toHex(res[0].nonce)}`;
            let prefix = `\x19Ethereum Signed Message:\n${res[0].nonce.length}`
            nonce = util.keccakFromString(prefix + res[0].nonce);
            const sig = signedMsg;
            const { v, r, s } = util.fromRpcSig(sig);
            const pubKey = util.ecrecover(nonce, v, r, s);
            const addrBuf = util.pubToAddress(pubKey);
            const addr = util.bufferToHex(addrBuf);

            if (wallet == addr) {
                let data = {
                    time: Date(),
                    wallet: wallet
                }
                const token = jwt.sign(data, "this is the secret key");
                result(null, { token });
            }



            // web3.eth.personal.ecRecover(`0x${toHex(res[0].nonce)}`, signedMsg).then(console.log);

            // let recoveredAddress = recoverPersonalSignature({
            //     data: `0x${toHex(res[0].nonce)}`,
            //     signature: signedMsg,
            //   });
            // console.log(recoveredAddress);
            return;
        }
        else {
            console.log("could not find user");
        }
        return;

    })

}


// User.getAll = (result) => {
//     sql.query("SELECT * FROM user", (err, res) => {
//         if (err) {
//         console.log("error: ", err);
//         result(err, null);
//         return;
//         }

//         if (res.length) {
//         console.log("found listings: ", res[0]);
//         result(null, res[0]);
//         return;
//         }

//         // no listings
//         result({ kind: "not_found" }, null);
//     });
// };

// User.updateId = (id, obj, result) => {
//     sql.query(
//         "UPDATE marketplace SET name = ?, description = ?, initStock = ?, currentStock = ?, cost = ?, imageUrl = ?, collectedWallets = ? WHERE id = ?",
//         [obj.name, obj.description, obj.initStock, obj.currentStock, obj.cost, obj.imageUrl, obj.collectedWallets, id],
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
//     });
// };

// User.validateSignedMsg = (obj, result) => {

// }
//maker User.CreateNew




module.exports = User;