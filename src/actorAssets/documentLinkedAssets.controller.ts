import { ActorAssetsController } from "./actorAssets.contorller";
import { DocumentLinkedAssetsService } from "./documentLinkedAssets.service";
import { DocumentLinkedAssetDTO, UploadDocumentRequestDTO } from "./documentLinkedAssets.dtos";
import { Body, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { DocumentLinkedAsset } from "./documentLinkedAsset.entity";
import { AuthGuard } from "../auth.guard";

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
        return await this.documentLinkedAssetsService.uploadDocument(body.actorId, body.assetId, body.documentBase64, body.uploadedDocumentType);
    }
}