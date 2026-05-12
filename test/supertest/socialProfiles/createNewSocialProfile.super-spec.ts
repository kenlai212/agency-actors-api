import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import { CommonTest } from '../common';

let actorId = "";
let assetId = ""

describe(`Create New Social Profile Super test`, () => {
    beforeAll(async () => {
        actorId = await CommonTest.createJaneSmith();
    })

    afterAll(async () => {
        await request(CommonTest.API_HOST)
            .delete(`/social-profiles/${assetId}`)
            .expect(200)

        await CommonTest.deleteJaneSmith(actorId);
    });

    it(`Successfully create a new Social`, async () => {
        const response = await request(CommonTest.API_HOST)
            .post("/social-profiles")
            .send({
                "actorId": actorId
            })

        //console.log(response);
        expect(response.status).toBe(201)

        const body = response.body;
        assetId = response.body.assetId;

        expect(body.actorId).toEqual(actorId);
        expect(body.assetId).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
    });
});