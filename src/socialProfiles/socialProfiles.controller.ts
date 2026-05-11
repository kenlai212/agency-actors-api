import { Body, Controller, Logger, Post } from "@nestjs/common";
import { PostSocialProfileRequestDTO, SocialProfileDTO } from "./socialProfiles.dtos";
import { SocialProfilesService } from "./socialProfiles.service";
import { ActorAssetsController } from "../actorAssets/actorAssets.contorller";

@Controller('social-profiles')
export class SocialProfilesController extends ActorAssetsController {
    logger = new Logger('SocialProfilesController');

    constructor(
        private readonly socialProfilesService: SocialProfilesService,
    ) {
        super(socialProfilesService)
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
}