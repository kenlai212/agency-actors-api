import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ResumeDTO, UploadResumeRequestDTO } from "./resumes.dtos";
import { SearchAssetRequestDTO } from "../actorAssets/actorAssets.dtos";
import { ResumesService } from "./resumes.service";
import { ActorAssetsController } from "../actorAssets/actorAssets.contorller";

@Controller()
export class ResumesController extends ActorAssetsController {
    constructor(
        private readonly resumesService: ResumesService
    ) {
        super(resumesService)
    }

    @Post("/resume")
    async uploadResume(@Body() body: UploadResumeRequestDTO): Promise<ResumeDTO> {
        return new ResumeDTO();
    }

    @Get("/resume")
    async searchResumes(@Query() query: SearchAssetRequestDTO): Promise<Array<ResumeDTO>> {
        return [new ResumeDTO()];
    }
}