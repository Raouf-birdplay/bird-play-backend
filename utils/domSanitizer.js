const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const DOMPurify = require("dompurify")(window);

const dataSanitizer = (data) => {
  const sanitizedData = {};
  for (let keys in data) {
    const fieldName = keys;
    const fieldValue = data[keys];
    const sanitizedValue =
      fieldValue == false ? false : DOMPurify.sanitize(fieldValue);
    sanitizedData[fieldName] = sanitizedValue;
  }

  for (let keys in sanitizedData) {
    const fieldValue = sanitizedData[keys];
    if (!fieldValue && fieldValue !== false) {
      return false;
    }
  }

  return sanitizedData;
};

module.exports = {
  dataSanitizer,
};
