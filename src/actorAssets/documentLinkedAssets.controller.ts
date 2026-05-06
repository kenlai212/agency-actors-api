import { ActorAssetsController } from "./actorAssets.contorller";
import { DocumentLinkedAssetsService } from "./documentLinkedAssets.service";
import { DocumentLinkedAssetDTO } from "./documentLinkedAssets.dtos";

export abstract class DocumentLinkedAssetsController extends ActorAssetsController {
    /*constructor(
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
    }*/
}