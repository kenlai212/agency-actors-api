import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';

const API_URL = "localhost:8080";
let actorId = "";
let assetId = ""

describe(`Create New Email Address Super test`, () => {
    beforeAll(async () => {
        await request(API_URL)
            .post("/agency-actors")
            .send({
                "agencyActorType": "CANDIDATE",
                "fullName": "Jane Smith"
            })
            .expect(201)
            .expect((res) => {
                actorId = res.body.actorId;
            })
    })

    afterAll(async () => {
        await request(API_URL)
            .delete(`/email-addresses/${assetId}`)
            .expect(200)

        await request(API_URL)
            .delete(`/agency-actors/${actorId}`)
            .expect(200)
    });

    it(`Successfully create a new Email Address`, async () => {
        const response = await request(API_URL)
            .post("/email-addresses")
            .send({
                "actorId": actorId,
                "addressString": "jane.smith@test.com"
            })

        //console.log(response);
        expect(response.status).toBe(201)

        const body = response.body;
        assetId = response.body.assetId;

        expect(body.actorId).toEqual(actorId);
        expect(body.assetId).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.isDefault).toBeTruthy();
    });
});