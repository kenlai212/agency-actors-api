import { describe, it } from "node:test";
import { AgencyActorsService } from "../../../src/agencyActors/agencyActors.service";
import { TestingModule } from "@nestjs/testing";
import { afterAll, beforeAll, expect } from "@jest/globals";
import { createSharedTestModule } from "./common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AgencyActor } from "../../../src/agencyActors/agencyActor.entity";
import { NewAgencyActorRequestDTO } from "../../../src/agencyActors/agencyActors.dto";

describe(`Create new Agency Actor E2E test`, () => {
    let agencyActorsService: AgencyActorsService;
    let moduleFixture: TestingModule;

    beforeAll(async () => {
        moduleFixture = await createSharedTestModule();
        agencyActorsService = moduleFixture.get<AgencyActorsService>(AgencyActorsService);
    })

    afterAll(async () => {
        const repository = moduleFixture.get(getRepositoryToken(AgencyActor));
        await repository.query(`DELETE FROM agency_actor`);
        await moduleFixture.close();
    });

    it(`Successfully create a new Agency Actor`, async () => {
        expect(true).toEqual(true)
        let dto = new NewAgencyActorRequestDTO();
        dto.fullName = "John Smit"
        const result = await agencyActorsService.createAgencyActor(dto).catch(error => { console.log(error.stack) })
        console.log(result);
        expect(result).toBeDefined();
    });
});