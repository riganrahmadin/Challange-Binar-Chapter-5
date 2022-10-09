const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  car_name: { type: "string"},
  car_price: { type: "integer"},
  car_size: { type: "string"},
  car_photo: { type: "text" },
};


const carValidator = (value) => {
  return v.validate(value, schema)
}

module.exports = carValidator