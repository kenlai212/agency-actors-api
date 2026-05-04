import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";
import { PhysicalAddress } from "./physicalAddress.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([PhysicalAddress]),
        AgencyActorsModule
    ]
})
export class physicalAddressModule { }