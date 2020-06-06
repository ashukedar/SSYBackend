database = [];

const addData = data => {
  database.push(data);
};

const getAllData = () => {
  return database;
};

exports.addData = addData;
exports.getAllData = getAllData;
