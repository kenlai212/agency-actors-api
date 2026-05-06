import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { UploadDocumentRequestDTO, UploadedDocumentDTO } from "./uploadedDocuments.dtos";
import { UploadedDocumentsService } from "./uploadedDocuments.service";

@Controller("/upload-documents")
export class UploadedDocumentsController {
    constructor(
        private readonly uploadedDocumentsService: UploadedDocumentsService
    ) { }

    @Post("/")
    @ApiOperation({
        summary: 'Upload Document',
        description: `Upload a document (e.g pdf, image) to an existing ActorId or AssetId. Will send to storage facility`
    })
    @ApiOkResponse({
        description: 'Successfully POST response UploadedDocumentDTO',
        type: UploadedDocumentDTO,
    })
    async uploadDocument(@Body() body: UploadDocumentRequestDTO): Promise<UploadedDocumentDTO> {
        return await this.uploadedDocumentsService.uploadNewDocument(body.assetId, body.uploadedDocumentType, body.documentBase64, body.assetId);
    }
}