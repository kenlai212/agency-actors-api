import { Body, Controller, Logger, Post } from "@nestjs/common";
import { NewSocialProfileRequestDTO, SocialProfileDTO } from "./socialProfiles.dtos";
import { SocialProfilesService } from "./socialProfiles.service";
import { ActorAssetsController } from "../actorAssets/actorAssets.controller";
import { ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";

@Controller('social-profiles')
export class SocialProfilesController extends ActorAssetsController {
    logger = new Logger('SocialProfilesController');

    constructor(
        private readonly socialProfilesService: SocialProfilesService,
    ) {
        super(socialProfilesService)
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Social Profile.',
        description: `New Social Profile must tie to an actor.`
    })
    @ApiCreatedResponse({
        description: `Successfully POST response ${SocialProfileDTO.name}.`,
        type: NewSocialProfileRequestDTO
    })
    async newAsset(@Body() dto: NewSocialProfileRequestDTO) {
        return this.assetsService.createAsset(dto);
    }
}