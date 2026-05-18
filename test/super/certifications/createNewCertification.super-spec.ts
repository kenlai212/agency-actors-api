import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import { CommonTest } from '../common';

let actorId = "";
let assetId = ""

describe(`Create New Certification Super test`, () => {
    beforeAll(async () => {
        actorId = await CommonTest.createJaneSmith();
    })

    afterAll(async () => {
        await request(CommonTest.API_HOST)
            .delete(`/certifications/${assetId}`)
            .expect(200)

        await CommonTest.deleteJaneSmith(actorId);
    });

    it(`Successfully create a new Certification`, () => {
        return request(CommonTest.API_HOST)
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