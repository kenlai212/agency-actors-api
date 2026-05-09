import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';

const API_URL = "localhost:8080";
let actorId = "";
let assetId = ""

describe(`Create New Govement Issue Document Super test`, () => {
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
            .delete(`/gov-issue-docs/${assetId}`)
            .expect(200)

        await request(API_URL)
            .delete(`/agency-actors/${actorId}`)
            .expect(200)
    });

    it(`Successfully create a new Employment`, async () => {
        const response = await request(API_URL)
            .post("/gov-issue-docs")
            .send({
                "actorId": actorId,
                "issuerGoverment": "HK",
                "issueDocType": "IDENTITY_CARD",
                "issueDocNumber": "HK12345"
            })

        //console.log(response);
        expect(response.status).toBe(201)

        const body = response.body;
        assetId = response.body.assetId;

        expect(body.actorId).toEqual(actorId);
        expect(body.assetId).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.issuerGoverment).toEqual("HK");
        expect(body.issueDocType).toEqual("IDENTITY_CARD");
        expect(body.issueDocNumber).toEqual("HK12345");
    });
});