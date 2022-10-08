const express = require("express");
const router = express.Router();

const { findAllCars, deleteCar, addCar, createCar, editCar, filterCars, updateCar } = require("../controllers/CarController");

router.get("/", (req, res) => {
  res.status(200);
  res.render("pages/dashboard/index", {
    title: "Dashboard",
    layout: "dashboard/index",
  });
});

router.get("/cars/add-car", addCar);

router.get("/cars", findAllCars);

router.post("/cars/create", createCar);

router.delete("/cars/delete/:id", deleteCar);

router.get("/cars/edit/:id", editCar);

router.put("/cars/update/:id", updateCar);

router.get("/cars/search", filterCars);

router.use((req, res) => {
  res.status(404);
  res.send(`<h1>tidak ditemukan/h1>`);
});

module.exports = router;