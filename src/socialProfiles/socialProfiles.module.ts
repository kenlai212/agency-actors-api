import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { SocialProfile } from "./socialProfile.entity";
import { SocialProfilesController } from "./socialProfiles.controller";
import { SocialProfilesService } from "./socialProfiles.service";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([SocialProfile]),
        AgencyActorsModule
    ],
    controllers: [
        SocialProfilesController
    ],
    providers: [
        SocialProfilesService
    ]
})
export class SocialProfilesModule { }