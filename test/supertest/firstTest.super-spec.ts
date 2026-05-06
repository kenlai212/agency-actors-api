import { describe, it, expect } from '@jest/globals';
import request from 'supertest';

describe(`First Super test`, () => {
    it(`should pass simple test`, () => {
        return request("localhost:8080")
            .get("/agency-actors?actorId=349ce726-99be-45da-be34-4443c6380d48")
            .expect(200)
            .expect((res) => {
                const body = res.body;
                console.log(body);
                expect(body.actorId).toEqual("349ce726-99be-45da-be34-4443c6380d48");
            });
    });
});
