import { Body, Controller, Delete, Get, Logger, Param, Post, Query } from "@nestjs/common";
import { GetSocialProfilesRequestDTO, PostSocialProfileRequestDTO, SocialProfileDTO } from "./socialProfiles.dtos";
import { SocialProfilesService } from "./socialProfiles.service";

@Controller('social-profiles')
export class SocialProfilesController {
    logger = new Logger('SocialProfilesController');

    constructor(
        private readonly socialProfilesService: SocialProfilesService,
    ) { }

    @Get("/social-profiles")
    async getCandidateById(@Query() query: GetSocialProfilesRequestDTO): Promise<Array<SocialProfileDTO>> {
        return await this.socialProfilesService.findSocialProfiles(
            query.actorType,
            query.actorId,
            query.provider,
            query.providerHandle
        );
    }

    @Post("/social-profile")
    async newCandidate(@Body() requestBody: PostSocialProfileRequestDTO): Promise<SocialProfileDTO> {
        return await this.socialProfilesService.createSocialProfile(
            requestBody.actorType,
            requestBody.actorId,
            requestBody.provider,
            requestBody.providerHandle,
            requestBody.url,
            requestBody.providerUserId
        );
    }

    @Delete("/social-profile/:socialProfileId")
    async deleteSocialProfile(@Param("socialProfileId") socialProfileId: string): Promise<void> {
        return await this.socialProfilesService.deleteSocialProfile(socialProfileId);
    }
}