import request from 'supertest';

export class CommonTest {
    static API_HOST = "localhost:8080";

    static async createJaneSmith() {
        const response = await request(CommonTest.API_HOST)
            .post("/agency-actors")
            .send({
                "agencyActorType": "CANDIDATE",
                "fullName": "Jane Smith"
            })
            .expect(201);

        return response.body.actorId;
    }
}