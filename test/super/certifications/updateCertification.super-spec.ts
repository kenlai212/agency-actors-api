import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import { CommonTest } from '../common';

let actorId = "";
let assetId = ""

describe(`Update Certification Super test`, () => {
    beforeAll(async () => {
        actorId = await CommonTest.createJaneSmith();

        await request(CommonTest.API_HOST)
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
                assetId = res.body.assetId;
            })
    })

    afterAll(async () => {
        await request(CommonTest.API_HOST)
            .delete(`/certifications/${assetId}`)
            .expect(200)

        await CommonTest.deleteJaneSmith(actorId);
    });

    it(`Successfully update Certification`, async () => {
        const response = await request(CommonTest.API_HOST)
            .put("/certifications")
            .send({
                "assetId": assetId,
                "certificationAuthority": "Microsoft",
                "certificateName": "Microsoft Azure Certification",
                "certificateNumber": "MS_CA_12234",
                "issueDate": "2027-05-07"
            })
            .expect(200)

        const body = response.body;
        assetId = response.body.assetId;

        expect(body.actorId).toEqual(actorId);
        expect(body.assetId).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.certificationAuthority).toEqual("Microsoft")
        expect(body.uploadedDocumentId).toBeUndefined();
        expect(body.certificateName).toEqual("Microsoft Azure Certification");
        expect(body.certificateNumber).toEqual("MS_CA_12234");
        expect(body.issueDate).toEqual("2027-05-07");
    });
});