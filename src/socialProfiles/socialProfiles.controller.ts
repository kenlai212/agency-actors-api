import { Body, Controller, Delete, Get, Logger, Param, Post, Query, UseGuards } from "@nestjs/common";
import { SearchSocialProfilesRequestDTO, PostSocialProfileRequestDTO, SocialProfileDTO } from "./socialProfiles.dtos";
import { SocialProfilesService } from "./socialProfiles.service";
import { ActorAssetsController } from "../actorAssets/actorAssets.contorller";
import { AuthGuard } from "../auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('social-profiles')
export class SocialProfilesController extends ActorAssetsController {
    logger = new Logger('SocialProfilesController');

    constructor(
        private readonly socialProfilesService: SocialProfilesService,
    ) {
        super(socialProfilesService)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
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
}