import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import { CommonTest } from '../common';

let actorId = "";
let assetId = ""

describe(`Create New Phone Number Super test`, () => {
    beforeAll(async () => {
        actorId = await CommonTest.createJaneSmith();
    })

    afterAll(async () => {
        await request(CommonTest.API_HOST)
            .delete(`/phone-numbers/${assetId}`)
            .expect(200)

        await request(CommonTest.API_HOST)
            .delete(`/agency-actors/${actorId}`)
            .expect(200)
    });

    it(`Successfully create a new PhoneNumber`, async () => {
        const response = await request(CommonTest.API_HOST)
            .post("/phone-numbers")
            .send({
                "actorId": actorId,
                "countryCode": "+852",
                "numberString": "12345678",
                "phoneNumberType": "MOBILE"
            })

        //console.log(response);
        expect(response.status).toBe(201)

        const body = response.body;
        assetId = response.body.assetId;

        expect(body.actorId).toEqual(actorId);
        expect(body.assetId).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.countryCode).toEqual("+852");
        expect(body.numberString).toEqual("12345678");
        expect(body.phoneNumberType).toEqual("MOBILE")
    });
});