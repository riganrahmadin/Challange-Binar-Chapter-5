const express = require("express");
const router = express.Router();

const { getCars,postCars,updateCars,deleteCars } = require("../controllers/apiController.js");

const uploadFile = require("../middleware/uploadFile.js");

router.get("/", getCars);
router.post("/", uploadFile, postCars);
router.put("/:id", uploadFile, updateCars);
router.delete("/:id", deleteCars);

router.use((req, res) => {
  res.status(404);
  res.send(`<h1>tidak ditemukan</h1>`);
});
module.exports = router;
