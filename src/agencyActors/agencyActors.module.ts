import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgencyActor } from "./agencyActor.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([AgencyActor]),
    ],
    controllers: [
    ],
    providers: [
    ],
    exports: [
    ]
})
export class AgencyActorsModule { }