import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { EducationDTO, NewEducationRequestDTO } from "./educations.dtos";
import { EducationsService } from "./educations.service";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";
import { AuthGuard } from "../auth.guard";
import { Education } from "./education.entity";

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
    async createNewEducation(@Body() dto: NewEducationRequestDTO): Promise<EducationDTO> {
        let entity = new Education();
        entity.actorId = dto.actorId;
        entity.institutionName = dto.institutionName;

        if (dto.levelOfEducation)
            entity.levelOfEducation = dto.levelOfEducation;

        if (dto.fieldOfStudy)
            entity.fieldOfStudy = dto.fieldOfStudy;

        if (dto.startYear)
            entity.startYear = dto.startYear;

        if (dto.endYear)
            entity.endYear = dto.endYear;

        return await this.educationsService.createAsset(entity);
    }
}