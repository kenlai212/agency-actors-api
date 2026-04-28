import { Module } from "@nestjs/common";
import { CandidatesController } from "./candidates.controller";
import { CandidatesService } from "./candidates.service";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { Candidate } from "./candidate.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Candidate]),
    ],
    controllers: [
        CandidatesController
    ],
    providers: [
        CandidatesService
    ],
    exports: [
        CandidatesService
    ]
})
export class CandidatesModule { }