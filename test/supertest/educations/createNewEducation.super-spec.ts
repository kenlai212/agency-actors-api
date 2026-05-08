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
            .delete(`/educations/${assetId}`)
            .expect(200)

        await request(API_URL)
            .delete(`/agency-actors/${actorId}`)
            .expect(200)
    });

    it(`Successfully create a new Education`, async () => {
        const response = await request(API_URL)
            .post("/educations")
            .send({
                "actorId": actorId,
                "institutionName": "University of Beijing",
                "levelOfEducation": "MASTERS",
                "fieldOfStudy": "Science",
                "startYear": 2004,
                "endYear": 2008
            })

        //console.log(response);
        expect(response.status).toBe(201)

        const body = response.body;
        assetId = response.body.assetId;

        expect(body.actorId).toEqual(actorId);
        expect(body.assetId).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.institutionName).toEqual("University of Beijing");
        expect(body.levelOfEducation).toEqual("MASTERS");
        expect(body.fieldOfStudy).toEqual("Science");
        expect(body.startYear).toEqual(2004);
        expect(body.endYear).toEqual(2008);
    });
});