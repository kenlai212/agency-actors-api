import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';

const host = "localhost:8080";
let actorId = "";
let assetId = ""

describe(`Update Certification Super test`, () => {
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

        await request(host)
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
        await request(host)
            .delete(`/certifications/${assetId}`)
            .expect(200)

        await request(host)
            .delete(`/agency-actors/${actorId}`)
            .expect(200)
    });

    it(`Successfully update Certification`, async () => {
        const response = await request(host)
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