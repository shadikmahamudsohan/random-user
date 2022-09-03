const express = require("express");
const controllers = require("../../controllers/user.controller");

const router = express.Router();

router.get("/random", controllers.getRandomUser);

router.get("/all", controllers.getAllUser);

router.post("/save", controllers.saveAUser);

router.patch("/bulk-update", controllers.bulkUpdate);

router.patch("/update/:id", controllers.updateSingleUser);

router.delete("/delete/:id", controllers.deleteUser);

module.exports = router;