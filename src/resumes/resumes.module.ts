import { Module } from "@nestjs/common";
import { ResumesController } from "./resumes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Resume } from "./resume.entity";
import { ResumesService } from "./resumes.service";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Resume]),
        AgencyActorsModule
    ],
    controllers: [ResumesController],
    providers: [
        ResumesService
    ]
})
export class ResumesModule { }