import { Module } from "@nestjs/common";
import { ResumesController } from "./resumes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Resume } from "./resume.entity";
import { CandidatesModule } from "../candidates/candidates.module";
import { ResumesService } from "./resumes.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Resume]),
        CandidatesModule
    ],
    controllers: [ResumesController],
    providers: [
        ResumesService
    ]
})
export class ResumesModule { }