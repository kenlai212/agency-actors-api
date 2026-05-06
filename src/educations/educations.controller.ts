import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { EducationDTO, NewEducationRequestDTO } from "./educations.dtos";
import { EducationsService } from "./educations.service";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";

@Controller("educations")
export class EducationsController extends DocumentLinkedAssetsController {
    constructor(
        private readonly educationsService: EducationsService
    ) {
        super(educationsService)
    }

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
        return await this.educationsService.createNewEducation(body);
    }
}