const { Car } = require("../models");
const errorHandler = require("../middleware/errorHandler.js");
const carValidator = require("../middleware/carValidator.js");
const { Op,} = require("sequelize");

exports.getCars = async (req, res) => {
  const { id, size, name } = req.query;
  try {
    let findedCars = null;
    if (id) {
      findedCars = await Car.findAll({
        where: {
          id: id,
        },
      });
    } else if (size) {
      findedCars = await Car.findAll({
        where: {
          car_name: {
            [Op.iRegexp]: name || "[a-z]",
          },
          car_size: size,
        },
      });
    } else if (name) {
      findedCars = await Car.findAll({
        where: {
          car_name: {
            [Op.iRegexp]: `${name}`,
          },
          car_size: {
            [Op.iRegexp]: size || "[a-z]",
          },
        },
      });
    } else {
      findedCars = await Car.findAll();
    }

    if (!findedCars) throw new Error(`Error: Invalid query `);

    res
      .status(200)
      .json({ message: "Successfully got cars data !", data: findedCars });
  } catch (e) {
    errorHandler(res, e);
  }
};

exports.postCars = async (req, res) => {
  try {
    //validate car input
    const car = {
      ...req.body,
      car_photo: `../upload/${req.file.filename}`,
      car_price: Number(req.body.car_price),
    };
    const validator = carValidator(car);
    if (validator.length) throw new Error(`Invalid input ! ${validator[0]}`);

    //crate car
    const newCar = await Car.create(car);
    res.status(200).redirect("/cars");
  } catch (e) {
    errorHandler(res, e);
  }
};

exports.updateCars = async (req, res) => {
  const { id } = req.params;
  try {
    //find car by id
    const findedCar = await Car.findByPk(id);
    if (!findedCar) throw new Error(`Error: Cannot find car with id : ${id}`);

    //validate car input
    const car = {
      ...req.body,
      car_photo: `../upload ${req.file.filename}`,
      car_price: Number(req.body.car_price),
    };
    const validator = carValidator(car);
    if (validator.length)
      throw new Error(`Invalid input ! ${validator.join(",")}`);

    //update finded car
    const updatedCar = await findedCar.update(car);
    res.status(200).json({
      message: `Successfully updated car with id : ${id}`,
      data: updatedCar,
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

exports.deleteCars = async (req, res) => {
  const { id } = req.params;
  try {
 
    //find car by id
    const findedCar = await Car.findByPk(id);
    if (!findedCar) throw new Error(`Error: Cannot find car with id : ${id}`);

    const deletedCar = await findedCar.destroy();
    res.status(200).redirect("/cars");
  } catch (e) {
    errorHandler(res, e);
  }
};
