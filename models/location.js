'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Location extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Location.init({
        location_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        website: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING
        },
        location_lat: {
            type: DataTypes.STRING
        },
        location_log: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Location',
    });
    return Location;
};