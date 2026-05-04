import { Delete, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ActorAssetsService } from "./actorAssets.service";
import { ActorAssetDTO, SearchAssetRequestDTO } from "./actorAssets.dtos";
import { ActorAsset } from "./actorAsset.entity";

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
        summary: 'Search Asset.',
        description: `Search by actorId, returns list of assets belonging to the actor Actor. Search by assetId, returns single asset record`
    })
    @ApiOkResponse({
        description: 'Successfully POST response ActorAssetDTO.',
        type: ActorAssetDTO,
    })
    async searchAssets(@Query() query: SearchAssetRequestDTO): Promise<Array<ActorAssetDTO>> {
        const assets = await this.assetsService.searchAssets(query.actorId, query.assetId);

        if (assets.length === 0) {
            throw new NotFoundException("No assets found for actor ID: " + query.actorId);
        }

        return assets;
    }
}