import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgencyActor } from "./agencyActor.entity";
import { AgencyActorsController } from "./agencyActor.controller";
import { AgencyActorsService } from "./agencyActors.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([AgencyActor]),
    ],
    controllers: [
        AgencyActorsController
    ],
    providers: [
        AgencyActorsService
    ],
    exports: [
        AgencyActorsService
    ]
})
export class AgencyActorsModule { }