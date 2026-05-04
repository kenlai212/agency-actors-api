import { Delete, Param } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ActorAssetsService } from "./actorAssets.service";
import { ObjectLiteral } from "typeorm";
import { ActorAssetDTO } from "./actorAssets.dtos";
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
}