import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';

const API_URL = "localhost:8080";
let actorId = "";
let assetId = ""

describe(`Create New Employment Super test`, () => {
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
            .delete(`/employments/${assetId}`)
            .expect(200)

        await request(API_URL)
            .delete(`/agency-actors/${actorId}`)
            .expect(200)
    });

    it(`Successfully create a new Employment`, async () => {
        const response = await request(API_URL)
            .post("/employments")
            .send({
                "actorId": actorId,
                "companyName": "Manulife",
                "jobTitle": "Software Engineer",
                "location": "123 Main Street, New York, USA",
                "startDate": "2020-01-01",
                "isCurrent": true
            })

        //console.log(response);
        expect(response.status).toBe(201)

        const body = response.body;
        assetId = response.body.assetId;

        expect(body.actorId).toEqual(actorId);
        expect(body.assetId).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.companyName).toEqual("Manulife");
        expect(body.jobTitle).toEqual("Software Engineer");
        expect(body.startDate).toEqual("2020-01-01");
        expect(body.isCurrent).toBeTruthy;
    });
});