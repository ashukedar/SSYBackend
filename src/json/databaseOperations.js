const fs = require("fs");
const path = require("path");

const readDatabase = () => {
  database = [];
  jsonString = fs.readFileSync(path.join(__dirname, "/database.json"));
  database = JSON.parse(jsonString);
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
      user.fullName = modifiedUser.fullName;
      user.dob = modifiedUser.dob;
      user.mobile = modifiedUser.mobile;
      user.alternateMob = modifiedUser.alternateMob;
      user.qualification = modifiedUser.qualification;
      user.occupation = modifiedUser.occupation;
      user.email = modifiedUser.email;
      user.address = modifiedUser.address;
      user.courses = modifiedUser.courses;
    }
  });
  writeDatabase(sadhakData);
  return modifiedUser;
};

const doesExists = (id) => {
  exists = false;
  database = getSadhakData();
  database.forEach((user) => {
    if (user.id == id) exists = true;
  });
  return exists;
};

exports.addData = addData;
exports.getSadhakData = getSadhakData;
exports.editData = editData;
exports.doesExists = doesExists;
