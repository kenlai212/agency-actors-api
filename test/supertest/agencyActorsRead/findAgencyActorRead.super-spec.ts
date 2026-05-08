import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';

const API_URL = "localhost:8080";
let actorId = "";
let certificationId1 = ""
let certificationId2 = ""
let educationId1 = ""
let educationId2 = ""

describe(`Create New Certification Super test`, () => {
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

        await request(API_URL)
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
                certificationId1 = res.body.assetId;
            })

        await request(API_URL)
            .post("/certifications")
            .send({
                "actorId": actorId,
                "certificationAuthority": "Microsoft",
                "certificateName": "Microsoft Azure Certification",
                "certificateNumber": "MS_CA_12234",
                "issueDate": "2027-05-07"
            })
            .expect(201)
            .expect((res) => {
                certificationId2 = res.body.assetId;
            })

        await request(API_URL)
            .post("/educations")
            .send({
                "actorId": actorId,
                "institutionName": "University of Beijing",
                "levelOfEducation": "MASTERS",
                "fieldOfStudy": "Science",
                "startYear": 2009,
                "endYear": 2012
            })
            .expect(201)
            .expect((res) => {
                educationId1 = res.body.assetId;
            })

        await request(API_URL)
            .post("/educations")
            .send({
                "actorId": actorId,
                "institutionName": "University of Beijing",
                "levelOfEducation": "UNDERGRADUATE",
                "fieldOfStudy": "Science",
                "startYear": 2004,
                "endYear": 2008
            })
            .expect(201)
            .expect((res) => {
                educationId2 = res.body.assetId;
            })
    })

    afterAll(async () => {
        await request(API_URL)
            .delete(`/educations/${educationId1}`)
            .expect(200)

        await request(API_URL)
            .delete(`/educations/${educationId2}`)
            .expect(200)

        await request(API_URL)
            .delete(`/certifications/${certificationId1}`)
            .expect(200)

        await request(API_URL)
            .delete(`/certifications/${certificationId2}`)
            .expect(200)

        await request(API_URL)
            .delete(`/agency-actors/${actorId}`)
            .expect(200)
    });

    it(`Successfully GET AgencyActorRead`, async () => {
        const response = await request(API_URL)
            .get(`/agency-actors-read?actorId=${actorId}`)
            .expect(200)

        const body = response.body;
        //console.log(body);

    });
});