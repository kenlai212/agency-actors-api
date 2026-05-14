import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";
import { Nationality } from "./nationality.entity";
import { NationalitiesController } from "./nationalities.controller";
import { NationalitiesService } from "./nationalities.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Nationality]),
        AgencyActorsModule
    ],
    controllers: [
        NationalitiesController
    ],
    providers: [
        NationalitiesService
    ],
    exports: [
        NationalitiesService
    ]
})
export class NationalitiesModule { }