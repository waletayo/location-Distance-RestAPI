import {BAD_REQUEST, CREATED, NOT_FOUND, OK} from "../../utils/status-code";

const LocationModel = require('../../models').Location;
import {locationValidator} from "./location.validator";
import _ from "underscore";
import vm from "v-response";
import {DistanceCalulator} from "../../utils/helper";

exports.GetAllLocation = async (req, res, next) => {
    try {
        const findLocations = await LocationModel.findAll();
        if (!findLocations) {
            return res.status(BAD_REQUEST).json(vm.ApiResponse(false, BAD_REQUEST, 'Oops! na error occur'))
        } else if (findLocations.length === 0) {
            return res.status(OK).json(vm.ApiResponse(true, OK, "0 locations created at the moment"))
        }
        return res.status(OK)
            .json(vm.ApiResponse(true, OK, "Success", findLocations));
    } catch (e) {
        return next(e);
    }

};

exports.createLocation = async (req, res, next) => {
    try {
        let obj = _.pick(req.body, ['location_name', 'description', 'website', 'phone', 'location_lat', 'location_log']);
        const validateLocationInput = await locationValidator.validateCreate(obj);
        if (!validateLocationInput.passed) {
            return res.status(BAD_REQUEST)
                .json({
                    status: false,
                    code: 400,
                    message: "There's error in your inputs",
                    errors: validateLocationInput.errors,
                })
        }
        const createLocation = await LocationModel.create(obj);
        if (!createLocation) {
            return res.status(BAD_REQUEST)
                .json(vm.ApiResponse(false, BAD_REQUEST, 'Oops! an error occur'))
        }
        if (createLocation) {
            return res.status(CREATED)
                .json(vm.ApiResponse(true, OK, 'SUCCESS', createLocation))
        }
        return res.status(BAD_REQUEST)
            .json(vm.ApiResponse(false, BAD_REQUEST, 'oops! an error occur'))
    } catch (e) {
        return next(e);
    }
};

exports.findOneLocation = async (req, res, next) => {
    try {
        if (req.query.locationId) {
            const getOneLocation = await LocationModel.findByPk(req.query.locationId)
            if (!getOneLocation) {
                return res.status(BAD_REQUEST)
                    .json(vm.ApiResponse(false, BAD_REQUEST, 'Requested Location not found'))
            }
            if (getOneLocation) {
                return res.status(OK)
                    .json(vm.ApiResponse(true, OK, 'SUCCESS', getOneLocation))
            }
        } else {
            return res.status(BAD_REQUEST)
                .json(vm.ApiResponse(false, BAD_REQUEST, 'Oops! please provide location details'))
        }
    } catch (e) {
        return next(e);
    }
};

exports.updateLocation = async (req, res, next) => {
    try {
        if (req.query.locationId) {
            let obj = _.pick(req.body, ['location_name', 'description', 'website', 'phone', 'contact', 'location_lat', 'location_log']);
            const getOneLocation = await LocationModel.findByPk(
                req.query.locationId
            );
            if (getOneLocation) {
                const findLocationAndUpdate = await LocationModel.update(obj, {where: {id: req.query.locationId}});
                if (!findLocationAndUpdate) {
                    return res.status(BAD_REQUEST)
                        .json(vm.ApiResponse(false, BAD_REQUEST, 'Oops! an error occurr'))
                }
                if (findLocationAndUpdate) {
                    return res.status(OK)
                        .json(vm.ApiResponse(true, OK, 'SUCCESS',))
                }
                return res.status(BAD_REQUEST)
                    .json(vm.ApiResponse(false, BAD_REQUEST, 'oops! an errror occurr'))
            } else {
                return res.status(BAD_REQUEST)
                    .json(vm.ApiResponse(false, BAD_REQUEST, 'Oops! please provide location details'))
            }
        }
        return res.status(NOT_FOUND).json(vm.ApiResponse(false, BAD_REQUEST, "Provided location details not found"))
    } catch (e) {
        return next(e);
    }
};
exports.deleteLocation = async (req, res, next) => {
    try {
        if (req.query.locationId) {
            const getOneLocation = await LocationModel.findByPk(req.query.locationId);
            if (getOneLocation) {
                const deleteLocation = await LocationModel.destroy({where: {id: req.query.locationId}})
                if (!deleteLocation) {
                    return res.status(BAD_REQUEST)
                        .json(vm.ApiResponse(false, BAD_REQUEST, 'Oops! an error occurr'))
                }
                if (deleteLocation) {
                    return res.status(OK)
                        .json(vm.ApiResponse(true, OK, 'SUCCESS',))
                }
                return res.status(BAD_REQUEST)
                    .json(vm.ApiResponse(false, BAD_REQUEST, 'oops! an errror occurr'))
            }
            return res.status(NOT_FOUND).json(vm.ApiResponse(false, BAD_REQUEST, "Provided location details not found"))
        } else {
            return res.status(BAD_REQUEST)
                .json(vm.ApiResponse(false, BAD_REQUEST, 'Oops! please provide location details'))
        }

    } catch (e) {
        return next(e);
    }
};

exports.distanceCalulator = async (req, res, next) => {

    try {
        const findUserLocation = await LocationModel.findByPk(req.body.locationId);
        if (findUserLocation) {
            if (findUserLocation.location_lat && findUserLocation.location_log !== null) {
                const result = DistanceCalulator(findUserLocation.location_lat, findUserLocation.location_log, req.body.adminlat, req.body.adminlog);
                return res.status(OK)
                    .json(vm.ApiResponse(true, OK, 'Success', result))
            }
            return res.status(BAD_REQUEST)
                .json(vm.ApiResponse(false, BAD_REQUEST, "Selected location coordinate is null"))
        }
        return res.status(NOT_FOUND).json(vm.ApiResponse(false, BAD_REQUEST, "Oops! invalid location"))
    } catch (e) {
        return next(e);
    }

};

