import { Body, Controller, Post } from "@nestjs/common";
import { EmploymentDTO, NewEmploymentRequestDTO } from "./employments.dtos";
import { EmploymentsService } from "./employments.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";
import { Employment } from "./employment.entity";

@Controller("/employments")
export class EmploymentsController extends DocumentLinkedAssetsController {
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
    async createNewEmployments(@Body() dto: NewEmploymentRequestDTO): Promise<EmploymentDTO> {
        let entity = new Employment();
        entity.actorId = dto.actorId;
        entity.companyName = dto.companyName;

        if (dto.jobTitle)
            entity.jobTitle = dto.jobTitle;

        if (dto.location)
            entity.location = dto.location;

        if (dto.startDate)
            entity.startDate = dto.startDate;

        if (dto.endDate) {
            entity.endDate = dto.endDate;
            entity.isCurrent = false;
        } else {
            entity.isCurrent = true;
        }

        return await this.employmentsService.createAsset(entity);
    }
}