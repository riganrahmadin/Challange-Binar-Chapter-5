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


const {
  getCars,
  postCars,
  updateCars,
  deleteCars,
} = require("../controllers/apiController.js");

const uploadFile = require("../middleware/uploadFile.js");

router.get("/api/v1/cars", getCars);
router.post("/api/v1/cars/add", uploadFile, postCars);
router.put("api/v1/cars/update", uploadFile, updateCars);
router.delete("api/v1/cars/:id", deleteCars);


module.exports = router;