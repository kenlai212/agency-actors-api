import { Body, Controller, Post } from "@nestjs/common";
import { ResumesService } from "./resumes.service";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";
import { ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";
import { NewResumeRequestDTO, ResumeDTO } from "./resumes.dtos";

@Controller("/resumes")
export class ResumesController extends DocumentLinkedAssetsController {
    constructor(
        private readonly resumesService: ResumesService
    ) {
        super(resumesService)
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Resume.',
        description: `New Resume must tie to an actor.`
    })
    @ApiCreatedResponse({
        description: `Successfully POST response ${ResumeDTO.name}.`,
        type: NewResumeRequestDTO
    })
    async newAsset(@Body() dto: NewResumeRequestDTO) {
        return this.assetsService.createAsset(dto);
    }
}