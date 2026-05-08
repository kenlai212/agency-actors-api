import { Module } from "@nestjs/common";
import { EmploymentsController } from "./employments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employment } from "./employment.entity";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";
import { EmploymentsService } from "./employments.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Employment]),
        AgencyActorsModule
    ],
    controllers: [
        EmploymentsController
    ],
    providers: [
        EmploymentsService
    ],
    exports: [
        EmploymentsService
    ]
})
export class EmploymentsModule { }