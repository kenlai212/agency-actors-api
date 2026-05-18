import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import { CommonTest } from '../common';

let actorId = "";
let assetId = ""

describe(`Create New Physical Address Super test`, () => {
    beforeAll(async () => {
        actorId = await CommonTest.createJaneSmith();
    })

    afterAll(async () => {
        await request(CommonTest.API_HOST)
            .delete(`/physical-addresses/${assetId}`)
            .expect(200)

        await CommonTest.deleteJaneSmith(actorId);
    });

    it(`Successfully create a new Physical Address`, async () => {
        const response = await request(CommonTest.API_HOST)
            .post("/physical-addresses")
            .send({
                "actorId": actorId,
                "addressLine1": "line one",
                "addressLine2": "line two",
                "addressLine3": "line three",
                "addressLine4": "line four",
                "addressLine5": "line five",
                "addressType": "HOME"
            })

        //console.log(response);
        expect(response.status).toBe(201)

        const body = response.body;
        assetId = response.body.assetId;

        expect(body.actorId).toEqual(actorId);
        expect(body.assetId).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.addressType).toEqual("HOME");
        expect(body.addressLine1).toEqual("line one");
        expect(body.addressLine2).toEqual("line two");
        expect(body.addressLine3).toEqual("line three");
        expect(body.addressLine4).toEqual("line four");
        expect(body.addressLine5).toEqual("line five");
    });
});