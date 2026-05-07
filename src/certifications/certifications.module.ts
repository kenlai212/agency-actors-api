import { Module } from "@nestjs/common";
import { CertificationsController } from "./certifications.controller";
import { CertificationsService } from "./certifications.service";
import { Certification } from "./certification.entity";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Certification]),
        AgencyActorsModule
    ],
    controllers: [
        CertificationsController
    ],
    providers: [
        CertificationsService
    ]

})
export class CertificationsModule { }