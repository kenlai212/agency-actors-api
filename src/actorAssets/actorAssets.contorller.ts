import { Body, Delete, Get, NotFoundException, Param, Post, Query } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ActorAssetsService, DocumentLinkedAssetsService } from "./actorAssets.service";
import { ActorAssetDTO, DocumentLinkedAssetDTO, SearchAssetRequestDTO, UploadDocumentRequestDTO } from "./actorAssets.dtos";
import { ActorAsset, DocumentLinkedAsset } from "./actorAsset.entity";

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

export abstract class DocumentLinkedAssetsController extends ActorAssetsController {
    constructor(
        protected readonly documentLinkedAssetsService: DocumentLinkedAssetsService<DocumentLinkedAsset, DocumentLinkedAssetDTO>,
    ) {
        super(documentLinkedAssetsService)
    }

    @Post("/upload-document")
    @ApiOperation({
        summary: 'Upload Document',
        description: `Upload a document (e.g pdf, image) to an existing Asset. Will send to storage facility`
    })
    @ApiOkResponse({
        description: 'Successfully POST response ActorAssetDTO',
        type: DocumentLinkedAssetDTO,
    })
    async uploadDocument(@Body() body: UploadDocumentRequestDTO): Promise<DocumentLinkedAssetDTO> {
        return await this.documentLinkedAssetsService.uploadDocument(body.assetId, body.documentBase64);
    }
}