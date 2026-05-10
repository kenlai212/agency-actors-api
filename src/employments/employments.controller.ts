import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { EmploymentDTO, NewEmploymentRequestDTO } from "./employments.dtos";
import { EmploymentsService } from "./employments.service";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";
import { AuthGuard } from "../auth.guard";

@Controller("/employments")
export class EmploymentsController extends DocumentLinkedAssetsController {
    constructor(
        private readonly employmentsService: EmploymentsService
    ) {
        super(employmentsService);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
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
}