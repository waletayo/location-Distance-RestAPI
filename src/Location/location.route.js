const express = require("express");

const router = express.Router();
const LocationController = require("./Location.controller");
router.post("/location/create", LocationController.createLocation);
router.get("/location/one", LocationController.findOneLocation);
router.get("/location/locations", LocationController.GetAllLocation);
router.patch("/location/one/edit", LocationController.updateLocation);
router.delete("/location/one/remove", LocationController.deleteLocation);
router.post("/location/calculate", LocationController.distanceCalulator);


export default router;
