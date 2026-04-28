import { Module } from "@nestjs/common";
import { CertificationsController } from "./certifications.controller";
import { CertificationsService } from "./certifications.service";
import { CandidatesModule } from "../candidates/candidates.module";
import { Certification } from "./certification.entity";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { AuthoritiesService } from "./authoritries.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Certification]),
        CandidatesModule
    ],
    controllers: [
        CertificationsController
    ],
    providers: [
        CertificationsService, AuthoritiesService
    ]

})
export class CertificationsModule { }