import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import { Test, TestingModule } from "@nestjs/testing";
import { AgencyActor } from "../../../src/agencyActors/agencyActor.entity";
import { AgencyActorDTO } from "../../../src/agencyActors/agencyActors.dto";
import { AgencyActorsService } from "../../../src/agencyActors/agencyActors.service";

dotenv.config({ path: '' + __dirname + '../../../.env' });

export const createSharedTestModule = async (): Promise<TestingModule> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
            TypeOrmModule.forRoot({
                type: 'mysql',
                host: "localhost",
                port: 3306,
                username: "system_acct",
                password: "52310a8-d43a-44c7-8c64-5ded12c762fe",
                database: "agency_actors_api",
                entities: [
                    AgencyActor
                ],
                synchronize: true
            }),
            TypeOrmModule.forFeature([AgencyActorDTO])
        ],
        providers: [AgencyActorsService]
    }).compile();

    return moduleFixture;
}