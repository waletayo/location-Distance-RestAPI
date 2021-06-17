import {BAD_REQUEST, CREATED, NOT_FOUND, OK} from "../utils/status-code";

const app = require('../setup/server');
const supertest = require('supertest');
import models from '../models';
import testHelper from "../utils/locationResourcesHelper";

const regularLocation = testHelper.createLocationCorrectData();
const IncompleteLocationPayload = testHelper.createLocationIncompletePayload();
const LocationPhoneNumber = testHelper.createLocationPhoneNumberExceed11();
const findOneValidPayload = testHelper.getLocationValidId();
const findOneInValidPayload = testHelper.getLocationInvalid();
const invalidPk = testHelper.getLocationNOTEXISTID();
const ValidDistancePayload = testHelper.ValidDistancePayload();

const location_url = '/api/v1/location';

describe('TEST SUITE FOR Location Controller', () => {
    beforeAll(() => models.sequelize.sync({force: true}));
    afterAll(() => models.sequelize.sync({force: true}));

    describe(`CREATE LOCATION:${location_url}`, () => {

        it('should create new location if all parameters are valid', done => {
            supertest(app).post(`${location_url}/create`).send(regularLocation).expect(CREATED)
                .then(response => {
                    expect(response.status).toBe(CREATED);
                    done();
                })
        });
        it('should return Bad request when incomplete payload is passed', done => {
            supertest(app).post(`${location_url}/create`).send(IncompleteLocationPayload).expect(BAD_REQUEST)
                .then(response => {
                    expect(response.status).toBe(BAD_REQUEST);
                    done();
                })
        });
        it('should return Bad request when phone number exceed 11 digit', done => {
            supertest(app).post(`${location_url}/create`).send(LocationPhoneNumber).expect(BAD_REQUEST)
                .then(response => {
                    expect(response.status).toBe(BAD_REQUEST);
                    done();
                })
        });


        it('should find one Location with valid payload', async () => {
            const locationId = findOneValidPayload.pk;
            const res = await supertest(app).get(`${location_url}/one?locationId=${locationId}`);
            expect(res.status).toEqual(200);

        });

        it('should return BadRequest when invalid Id is passed', done => {
            const locationId = findOneInValidPayload.pk;
            supertest(app).get(`${location_url}/one?locationId=${locationId}`).expect(BAD_REQUEST)
                .then(response => {
                    expect(response.status).toBe(BAD_REQUEST);
                    done();
                })
        });
        it('should get list of locations', async () => {
            const response = await supertest(app).get(`${location_url}/locations`);
            expect(response.status).toEqual(200);
        });

        it('should get calculated distance between admin log and client', done => {
            supertest(app).post(`${location_url}/calculate`).send(ValidDistancePayload).expect(OK)
                .then(response => {
                    expect(response.status).toBe(OK);
                    expect(response.body.message).toMatch('Success');
                    done();
                })
        });
        it('should delete location when valid id is passed', async () => {
            const locationId = findOneValidPayload.pk;
            const response = await supertest(app).delete(`${location_url}/one/remove?locationId=${locationId}`);
            expect(response.status).toEqual(OK);
        });

        it('should return  BAD Request when Location Id is not passed or empty', async () => {
            const locationId = findOneInValidPayload.pk;
            const response = await supertest(app).delete(`${location_url}/one/remove?locationId=${locationId}`);
            expect(response.status).toEqual(BAD_REQUEST);
        });
        it('should return NOT FOUND When Invalid Id is passed', async () => {
            const locationId = invalidPk.pk;
            const response = await await supertest(app).delete(`${location_url}/one/remove?locationId=${locationId}`);
            expect(response.status).toEqual(NOT_FOUND);
        });
    });
})



