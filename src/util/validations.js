const databaseOperations = require("../json/databaseOperations");

validationResult = {
  status: 200,
  message: "valid"
};

modifyValidationResult = (status, message) => {
  validationResult.status = status;
  validationResult.message = message;
};

checkRequiredFields = (data) => {
  if (!data) {
    modifyValidationResult(400, "Please fill registration information");
  } else if (!data.fullName) {
    modifyValidationResult(400, "Full Name is mandatory");
  } else if (!data.dob) {
    modifyValidationResult(400, "Date of birth is mandatory");
  } else if (!data.mobile) {
    modifyValidationResult(400, "Mobile number is mandatory");
  } else if (!data.address) {
    modifyValidationResult(400, "Home address is mandatory");
  } else if (!data.courses || data.courses.length == 0) {
    modifyValidationResult(400, "Atleaast one course is mandatory");
  }
};

checkExistence = (data) => {
  database = databaseOperations.getSadhakData();
  database.forEach((user) => {
    if (
      user.fullName.toLowerCase() === data.fullName.toLowerCase() &&
      user.mobile === data.mobile
    ) {
      modifyValidationResult(400, "User already exists");
    }
  });
};

exports.validateData = (data) => {
  checkRequiredFields(data);
  checkExistence(data);
  return validationResult;
};
