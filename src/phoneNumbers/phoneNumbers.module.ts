import { Module } from "@nestjs/common";
import { PhoneNumbersController } from "./phoneNumbers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhoneNumber } from "./phoneNumber.entity";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([PhoneNumber]),
        AgencyActorsModule
    ],
    controllers: [
        PhoneNumbersController
    ]
})
export class phoneNumbersModule { }