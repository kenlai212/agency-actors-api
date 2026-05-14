import { Body, Controller, Post, Put } from "@nestjs/common";
import { EducationsService } from "./educations.service";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { EducationDTO, NewEducationRequestDTO, UpdateEducationRequestDTO } from "./educations.dtos";

@Controller("educations")
export class EducationsController extends DocumentLinkedAssetsController {
    constructor(
        private readonly service: EducationsService
    ) {
        super(service)
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Education.',
        description: `New Education must tie to an actor.`
    })
    @ApiCreatedResponse({
        description: `Successfully POST response ${EducationDTO.name}.`,
        type: EducationDTO
    })
    async newAsset(@Body() dto: NewEducationRequestDTO) {
        return this.assetsService.createAsset(dto);
    }

    @Put("/")
    @ApiOperation({
        summary: 'Update Education.',
        description: `Update Education`
    })
    @ApiOkResponse({
        description: `Successfully POST response ${EducationDTO.name}`,
        type: EducationDTO,
    })
    async updateAsset(@Body() body: UpdateEducationRequestDTO): Promise<EducationDTO> {
        return this.service.updateAsset(body);
    }
}