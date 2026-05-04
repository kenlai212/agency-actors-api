import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { EmploymentDTO, NewEmploymentRequestDTO } from "./employments.dtos";
import { UploadDocumentRequestDTO } from "../certifications/certifications.dtos";
import { EmploymentsService } from "./employments.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { SearchAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

@Controller("/employments")
export class EmploymentsController {
    constructor(
        private readonly employmentsService: EmploymentsService
    ) { }

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

    @Delete("/:assetId")
    async deleteEmployments(@Param("assetId") assetId: string): Promise<string> {
        return await this.employmentsService.deleteAsset(assetId);
    }

    @Post("/upload-document")
    async uploadDocument(@Body() body: UploadDocumentRequestDTO): Promise<EmploymentDTO> {
        return new EmploymentDTO();
    }
}