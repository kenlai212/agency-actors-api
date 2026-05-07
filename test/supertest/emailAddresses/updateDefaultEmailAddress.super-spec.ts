import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';

const API_URL = "localhost:8080";
let actorId = "";
let assetId1 = "";
let assetId2 = "";

describe(`Create New Email Address Super test`, () => {
    beforeAll(async () => {
        await request(API_URL)
            .post("/agency-actors")
            .send({
                "agencyActorType": "CANDIDATE",
                "fullName": "Jane Smith"
            })
            .expect((res) => {
                actorId = res.body.actorId;
            })

        await request(API_URL)
            .post("/email-addresses")
            .send({
                "actorId": actorId,
                "addressString": "jane.smith@test.com"
            })
            .expect((res) => {
                assetId1 = res.body.assetId;
            })

        await request(API_URL)
            .post("/email-addresses")
            .send({
                "actorId": actorId,
                "addressString": "jill.smith@test.com"
            })
            .expect((res) => {
                assetId2 = res.body.assetId;
            })
    })

    afterAll(async () => {
        await request(API_URL)
            .delete(`/email-addresses/${assetId1}`)
            .expect(200)

        await request(API_URL)
            .delete(`/email-addresses/${assetId2}`)
            .expect(200)

        await request(API_URL)
            .delete(`/agency-actors/${actorId}`)
            .expect(200)
    });

    it(`Update Default Email Address`, async () => {
        const email1 = await request(API_URL)
            .get(`/email-addresses?assetId=${assetId1}`)
            .expect(200)

        expect(email1.body.isDefault).toBe(true);

        const email2 = await request(API_URL)
            .get(`/email-addresses?addressString=jill.smith@test.com`)
        //    .expect(200)
        console.log(email2);
        expect(email2.body.isDefault).toBe(false);
    });
});