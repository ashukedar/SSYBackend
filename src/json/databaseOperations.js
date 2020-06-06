const fs = require("fs");
const path = require("path");

const readDatabase = () => {
  database = [];
  jsonString = fs.readFileSync(path.join(__dirname, "/database.json"));
  database = JSON.parse(jsonString);
  console.log("readdatabase");
  console.log(database);
  return database;
};

const writeDatabase = (sadhakData) => {
  database = readDatabase();
  database.sadhakData = sadhakData;
  jsonString = JSON.stringify(database);
  fs.writeFileSync(path.join(__dirname, "/database.json"), jsonString);
};

const getSadhakData = () => {
  database = readDatabase();
  console.log("getSadhakData");
  console.log(database.sadhakData);
  return database.sadhakData;
};

const addData = (data) => {
  sadhakData = getSadhakData();
  newUser = { ...data, id: sadhakData.length + 1 };
  sadhakData.push(newUser);
  writeDatabase(sadhakData);
  return newUser;
};

const editData = (data) => {
  sadhakData = getSadhakData();
  modifiedUser = { ...data };
  sadhakData.forEach((user) => {
    if (user.id === data.id) {
      user = modifiedUser;
    }
  });
  return modifiedUser;
};

const doesExists = (id) => {
  exists = false;
  database = getSadhakData();
  console.log("id: " + id);
  database.forEach((user) => {
    console.log("userID: " + user.id);
    if (user.id == id) exists = true;
  });
  return exists;
};

exports.addData = addData;
exports.getSadhakData = getSadhakData;
exports.editData = editData;
exports.doesExists = doesExists;
