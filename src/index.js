'use strict';
import errorHandler from "../setup/error-handler";
import Q from 'q';
import LocationRoutes from "../src/location/Location.route";


/**
 * The routes will add all the application defined routes
 * @param {express} app The app is an instance of an express application
 * @return {Promise<void>}
 **/

export default (app) => {
    app.use('/api/v1', LocationRoutes);
    app.use("*", (req, res, next) => {
        const appError = {status: 404, message: 'Invalid request'};
        return next(appError);
    });
    app.use(errorHandler);

    return Q.resolve(app);
}


