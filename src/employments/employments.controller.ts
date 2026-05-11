import { Body, Controller, Post, Put } from "@nestjs/common";
import { EmploymentsService } from "./employments.service";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { EmploymentDTO, NewEmploymentRequestDTO, UpdateEmploymentRequestDTO } from "./employments.dtos";

@Controller("/employments")
export class EmploymentsController extends DocumentLinkedAssetsController {
    constructor(
        private readonly employmentsService: EmploymentsService
    ) {
        super(employmentsService);
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Employment.',
        description: `New Employment must tie to an actor.`
    })
    @ApiCreatedResponse({
        description: `Successfully POST response ${EmploymentDTO.name}.`,
        type: NewEmploymentRequestDTO
    })
    async newAsset(@Body() dto: NewEmploymentRequestDTO) {
        return this.assetsService.createAsset(dto);
    }

    @Put("/")
    @ApiOperation({
        summary: 'Update Employment.',
        description: `Update Employment`
    })
    @ApiOkResponse({
        description: `Successfully POST response ${EmploymentDTO.name}`,
        type: EmploymentDTO,
    })
    async updateAsset(@Body() body: UpdateEmploymentRequestDTO): Promise<EmploymentDTO> {
        return this.employmentsService.updateAsset(body);
    }
}