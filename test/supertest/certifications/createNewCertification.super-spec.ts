import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';

const host = "localhost:8080";
let actorId = "";
let assetId = ""

describe(`Create New Certification Super test`, () => {
    beforeAll(async () => {
        await request(host)
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
        await request(host)
            .delete(`/certifications/${assetId}`)
            .expect(200)

        await request(host)
            .delete(`/agency-actors/${actorId}`)
            .expect(200)
    });

    it(`Successfully create a new Certification`, () => {
        return request(host)
            .post("/certifications")
            .send({
                "actorId": actorId,
                "certificationAuthority": "Amazon",
                "certificateName": "Amazon AWS Certification",
                "certificateNumber": "AWS_CA_12234",
                "issueDate": "2026-05-07"
            })
            .expect(201)
            .expect((res) => {
                const body = res.body;
                assetId = res.body.assetId;
                expect(body.actorId).toEqual(actorId);
                expect(body.assetId).toBeDefined();
                expect(body.createdAt).toBeDefined();
                expect(body.updatedAt).toBeDefined();
                expect(body.certificationAuthority).toEqual("Amazon")
                expect(body.uploadedDocumentId).toBeUndefined();
                expect(body.certificateName).toEqual("Amazon AWS Certification");
                expect(body.certificateNumber).toEqual("AWS_CA_12234");
            });
    });
});