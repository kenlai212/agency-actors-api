import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { SocialProfile } from "./socialProfile.entity";
import { SocialProfilesController } from "./socialProfiles.controller";
import { SocialProfilesService } from "./socialProfiles.service";
import { CandidatesModule } from "../candidates/candidates.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([SocialProfile]),
        CandidatesModule
    ],
    controllers: [
        SocialProfilesController
    ],
    providers: [
        SocialProfilesService
    ]
})
export class SocialProfilesModule { }