import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { EmploymentDTO, NewEmploymentRequestDTO } from "./employments.dtos";
import { EmploymentsService } from "./employments.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { SearchAssetRequestDTO, UploadDocumentRequestDTO } from "../actorAssets/actorAssets.dtos";
import { ActorAssetsController } from "../actorAssets/actorAssets.contorller";

@Controller("/employments")
export class EmploymentsController extends ActorAssetsController {
    constructor(
        private readonly employmentsService: EmploymentsService
    ) {
        super(employmentsService);
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Employment for an Actor'
    })
    @ApiOkResponse({
        description: 'Successfully POST response EmmploymentDTO.',
        type: EmploymentDTO,
    })
    async createNewEmployments(@Body() newEmploymentRequestDTO: NewEmploymentRequestDTO): Promise<EmploymentDTO> {
        return await this.employmentsService.createNewEmployment(newEmploymentRequestDTO);
    }

    @Get("/")
    async searchEmployments(@Query() query: SearchAssetRequestDTO): Promise<EmploymentDTO[]> {
        return await this.employmentsService.searchEmployment(query.actorId, query.assetId);
    }

    @Post("/upload-document")
    async uploadDocument(@Body() body: UploadDocumentRequestDTO): Promise<EmploymentDTO> {
        return await this.employmentsService.uploadDocument(body.assetId, body.documentBase64);
    }
}