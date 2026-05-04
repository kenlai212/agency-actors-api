import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";
import { PhysicalAddress } from "./physicalAddress.entity";
import { PhysicalAddressesController } from "./physicalAddresses.controller";
import { PhysicalAddressesService } from "./physicalAddresses.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([PhysicalAddress]),
        AgencyActorsModule
    ],
    controllers: [
        PhysicalAddressesController
    ],
    providers: [
        PhysicalAddressesService
    ]
})
export class physicalAddressesModule { }