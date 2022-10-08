const { Car } = require("../models");
const { Op, Sequelize } = require("sequelize");

const moment = require("moment");

const toRupiah = require("@develoka/angka-rupiah-js");

const findAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.status(200);
    res.render("../views/pages/dashboard/car", {
      title: "List Car",
      layout: "dashboard/index",
      cars: cars,
      moment,
      msg: req.flash("msg"),
      isActive: req.url,
      toRupiah,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const filterCars = async (req, res) => {
  if (req.query.car_size) {
    try {
      const cars = await Car.findAll({
        where: {
          car_size: req.query.car_size,
        },
      });
      res.status(200);
      res.render("../views/pages/dashboard/car", {
        title: "List Car",
        layout: "dashboard/index",
        cars: cars,
        moment,
        msg: req.flash("msg"),
        isActive: req.url,
        toRupiah,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  } else {
    try {
      const cars = await Car.findAll({
        where: {
          [Op.or]: [
            {
              car_name: {
                [Sequelize.Op.iLike]: `%${req.query.q}%`,
              },
            },
            {
              car_size: {
                [Sequelize.Op.iLike]: `%${req.query.q}%`,
              },
            },
          ],
        },
      });

      res.status(200);
      res.render("../views/pages/dashboard/car", {
        title: "List Car",
        layout: "dashboard/index",
        cars: cars,
        moment,
        msg: req.flash("msg"),
        isActive: req.url,
        toRupiah,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
};

const addCar = (req, res) => {
  res.status(200);
  res.render("pages/dashboard/add-car", {
    title: "Add New Car",
    layout: "dashboard/index",
  });
};

const createCar = async (req, res) => {
  try {
    await Car.create({
      car_name: req.body.car_name,
      car_price: req.body.car_price,
      car_size: req.body.car_size,
      car_photo: req.body.car_photo,
    });
    req.flash("msg", "Data Berhasil Disimpan");
    res.status(201).redirect("/cars");
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    await Car.destroy({
      where: {
        id: req.params.id,
      },
    });
    req.flash("msg", "Data Berhasil Dihapus");
    res.status(200).redirect("/cars");
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const editCar = async (req, res) => {
  try {
    const dataCar = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200);
    res.render("../views/pages/dashboard/edit-car", {
      title: "Update Car Information",
      layout: "dashboard/index",
      car: dataCar,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateCar = async (req, res) => {
  try {
    await Car.update(
      {
        car_name: req.body.car_name,
        car_price: req.body.car_price,
        car_size: req.body.car_size,
        car_photo: req.body.car_photo,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    req.flash("msg", "Data Berhasil Diupdate");
    res.status(200).redirect("/cars");
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  findAllCars,
  filterCars,
  addCar,
  createCar,
  deleteCar,
  editCar,
  updateCar,
};