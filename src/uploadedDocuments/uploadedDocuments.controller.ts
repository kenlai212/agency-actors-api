import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { UploadDocumentRequestDTO, UploadedDocumentDTO } from "./uploadedDocuments.dtos";
import { UploadedDocumentsService } from "./uploadedDocuments.service";
import { AuthGuard } from "../auth.guard";

@Controller("/upload-documents")
export class UploadedDocumentsController {
    constructor(
        private readonly uploadedDocumentsService: UploadedDocumentsService
    ) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post("/")
    @ApiOperation({
        summary: 'Upload Document',
        description: `Upload a document (e.g pdf, image) to an existing ActorId. Will send for virus scan, storage facility, data abstraction`
    })
    @ApiOkResponse({
        description: 'Successfully POST response UploadedDocumentDTO',
        type: UploadedDocumentDTO,
    })
    async uploadDocument(@Body() body: UploadDocumentRequestDTO): Promise<UploadedDocumentDTO> {
        return await this.uploadedDocumentsService.uploadNewDocument(body.actorId, body.uploadedDocumentType, body.documentBase64);
    }
}