import { Delete, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ActorAssetsService } from "./actorAssets.service";
import { ActorAssetDTO, FindAssetRequestDTO } from "./actorAssets.dtos";
import { ActorAsset } from "./actorAsset.entity";
import { AuthGuard } from "../auth.guard";

export abstract class ActorAssetsController {
    constructor(
        protected readonly assetsService: ActorAssetsService<ActorAsset, ActorAssetDTO>,
    ) { }

    @Delete("/:assetId")
    @ApiOperation({
        summary: `Delete Asset`
    })
    @ApiOkResponse({
        description: 'Successfully DELETE response a successful message',
        type: String,
    })
    async deleteAsset(@Param("assetId") assetId: string): Promise<string> {
        return await this.assetsService.deleteAsset(assetId);
    }

    @Get("/")
    @ApiOperation({
        summary: 'Find Asset.',
        description: `Search by assetId, returns single asset record`
    })
    @ApiOkResponse({
        description: 'Successfully POST response ActorAssetDTO.',
        type: ActorAssetDTO,
    })
    async searchAssets(@Query() query: FindAssetRequestDTO): Promise<ActorAssetDTO> {
        return await this.assetsService.findAsset(query.assetId);
    }
}