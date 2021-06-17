'use strict';
import Validator from "validatorjs";

export const locationValidator = {
    /**
     *@function
     * @param {Object} obj The validation object
     * @return {Object}
     * */
    validateCreate(obj) {
        const rules = {
            location_name: 'required|string',
            description: 'required|string',
            website: 'required|string',
            phone: 'required|string|max:11',
            location_lat: 'required|string',
            location_log: 'required|string',
        };
        const validator = new Validator(obj, rules);
        return {
            errors: validator.errors.all(),
            passed: validator.passes(),
        }
    },
};