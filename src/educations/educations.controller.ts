import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { EducationDTO, NewEducationRequestDTO, UploadDocumentRequestDTO } from "./educations.dtos";
import { EducationsService } from "./educations.service";
import { SearchAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

@Controller("educations")
export class EducationsController {
    constructor(
        private readonly educationsService: EducationsService
    ) { }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Education.',
        description: `New Education must tie to an actor.`
    })
    @ApiOkResponse({
        description: 'Successfully POST response EducationDTO.',
        type: EducationDTO,
    })
    async createNewEducation(@Body() body: NewEducationRequestDTO): Promise<EducationDTO> {
        return await this.educationsService.createNewEducation(body.actorId, body.details, body.documentBase64);
    }

    @Get("/")
    @ApiOperation({
        summary: 'Create new Education.',
        description: `New Education must tie to an actor.`
    })
    @ApiOkResponse({
        description: 'Successfully POST response EducationDTO.',
        type: EducationDTO,
    })
    async searchEducations(@Query() query: SearchAssetRequestDTO): Promise<Array<EducationDTO>> {
        return await this.educationsService.searchEducations(query.actorId, query.assetId);
    }

    @Delete("/:educationId")
    @ApiOperation({
        summary: 'Delete Education.',
        description: `Delete Education will also delete document stored as well`
    })
    @ApiOkResponse({
        description: 'Successfully DELETE response message.',
        type: String,
    })
    async deleteEducation(@Param("educationId") educationId: string): Promise<string> {
        return await this.educationsService.deleteAsset(educationId);
    }

    @Post("/upload-document")
    @ApiOperation({
        summary: 'Upload Education Document',
        description: `Upload a document (e.g pdf, image) to an existing Education. Will send to storage facility`
    })
    @ApiOkResponse({
        description: 'Successfully POST response EducationDTO',
        type: EducationDTO,
    })
    async uploadDocument(@Body() body: UploadDocumentRequestDTO): Promise<EducationDTO> {
        return await this.educationsService.uploadDocument(body.educationId, body.documentBase64);
    }
}