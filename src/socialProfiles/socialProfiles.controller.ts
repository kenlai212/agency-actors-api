import { Body, Controller, Delete, Get, Logger, Param, Post, Query } from "@nestjs/common";
import { SearchSocialProfilesRequestDTO, PostSocialProfileRequestDTO, SocialProfileDTO } from "./socialProfiles.dtos";
import { SocialProfilesService } from "./socialProfiles.service";

@Controller('social-profiles')
export class SocialProfilesController {
    logger = new Logger('SocialProfilesController');

    constructor(
        private readonly socialProfilesService: SocialProfilesService,
    ) { }

    @Get("/")
    async getCandidateById(@Query() query: SearchSocialProfilesRequestDTO): Promise<Array<SocialProfileDTO>> {
        return await this.socialProfilesService.findSocialProfiles(
            query.actorId,
            query.provider,
            query.providerHandle
        );
    }

    @Post("/")
    async newCandidate(@Body() requestBody: PostSocialProfileRequestDTO): Promise<SocialProfileDTO> {
        return await this.socialProfilesService.createSocialProfile(
            requestBody.actorId,
            requestBody.provider,
            requestBody.providerHandle,
            requestBody.url,
            requestBody.providerUserId
        );
    }

    @Delete("/:socialProfileId")
    async deleteSocialProfile(@Param("socialProfileId") socialProfileId: string): Promise<string> {
        return await this.socialProfilesService.deleteAsset(socialProfileId);
    }
}