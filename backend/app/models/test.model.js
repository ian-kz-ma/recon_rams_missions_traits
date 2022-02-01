//This file contains the actual sql query to be executed against the db
//Each table should get its own model detailing the various queries that can be made against it

const sql = require("./db.js");

// constructor
const Test = function(test) {
  this.id = test.id;
  this.name = test.name;
  this.age = test.age;
};

Test.create = (newTest, result) => {
  sql.query("INSERT INTO test_table SET ?", newTest, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created test entry: ", { id: res.insertId, ...newTest });
    result(null, { id: res.insertId, ...newTest });
  });
};

Test.findById = (id, result) => {
  sql.query(`SELECT * FROM test_table WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found test: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Test with the id
    result({ kind: "not_found" }, null);
  });
};

Test.updateById = (id, testObj, result) => {
  sql.query(
    "UPDATE test_table SET title = ?, description = ?, published = ? WHERE id = ?",
    [testObj.title, testObj.description, testObj.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Test with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated test_table: ", { id: id, ...testObj });
      result(null, { id: id, ...testObj });
    }
  );
};

Test.remove = (id, result) => {
  sql.query("DELETE FROM test_table WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Test with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted test with id: ", id);
    result(null, res);
  });
};



module.exports = Test;