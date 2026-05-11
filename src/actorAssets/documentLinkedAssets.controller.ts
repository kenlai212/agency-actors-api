import { ActorAssetsController } from "./actorAssets.contorller";
import { DocumentLinkedAssetsService } from "./documentLinkedAssets.service";
import { DocumentLinkedAssetDTO, UpdateDocumentIdRequestDTO } from "./documentLinkedAssets.dtos";
import { Body, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { DocumentLinkedAsset } from "./documentLinkedAsset.entity";

export abstract class DocumentLinkedAssetsController extends ActorAssetsController {
    constructor(
        protected readonly documentLinkedAssetsService: DocumentLinkedAssetsService<DocumentLinkedAsset, DocumentLinkedAssetDTO>,
    ) {
        super(documentLinkedAssetsService)
    }

    @Post("/update-document-id")
    @ApiOperation({
        summary: 'Update Uploaded Document ID',
        description: `Update Uploaded Document ID`
    })
    @ApiOkResponse({
        description: 'Successfully POST response ActorAssetDTO',
        type: DocumentLinkedAssetDTO,
    })
    async uploadDocument(@Body() body: UpdateDocumentIdRequestDTO): Promise<DocumentLinkedAssetDTO> {
        return await this.documentLinkedAssetsService.uploadDocument(body.assetId, body.uploadedDocumentId);
    }
}