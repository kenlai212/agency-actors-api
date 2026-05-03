import { Module } from "@nestjs/common";
import { EducationsController } from "./educations.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Education } from "./education.entity";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";
import { EducationsService } from "./educations.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Education]),
        AgencyActorsModule
    ],
    controllers: [
        EducationsController
    ],
    providers: [
        EducationsService
    ]
})
export class EducationsModule { }