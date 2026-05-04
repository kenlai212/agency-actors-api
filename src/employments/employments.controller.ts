import { Body, Controller, Post } from "@nestjs/common";
import { EmploymentDTO, NewEmploymentRequestDTO } from "./employments.dtos";
import { EmploymentsService } from "./employments.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { UploadDocumentRequestDTO } from "../actorAssets/actorAssets.dtos";
import { DocumentLinkedAssetsController } from "../actorAssets/actorAssets.contorller";

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
    async createNewEmployments(@Body() newEmploymentRequestDTO: NewEmploymentRequestDTO): Promise<EmploymentDTO> {
        return await this.employmentsService.createNewEmployment(newEmploymentRequestDTO);
    }
}