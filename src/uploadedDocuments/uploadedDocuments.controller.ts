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
        description: `Upload a document (e.g pdf, image) to an existing ActorId. Will send for virus scan, storage facility, data abstraction`
    })
    @ApiOkResponse({
        description: 'Successfully POST response UploadedDocumentDTO',
        type: UploadedDocumentDTO,
    })
    async uploadDocument(@Body() dto: UploadDocumentRequestDTO): Promise<UploadedDocumentDTO> {
        return await this.uploadedDocumentsService.uploadNewDocument(dto);
    }
}