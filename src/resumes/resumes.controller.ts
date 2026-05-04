import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ResumeDTO, UploadResumeRequestDTO } from "./resumes.dtos";
import { SearchAssetRequestDTO } from "../actorAssets/actorAssets.dtos";
import { ResumesService } from "./resumes.service";

@Controller()
export class ResumesController {
    constructor(
        private readonly resumesService: ResumesService
    ) { }

    @Post("/resume")
    async uploadResume(@Body() body: UploadResumeRequestDTO): Promise<ResumeDTO> {
        return new ResumeDTO();
    }

    @Delete("/resume/:resumeId")
    async deleteResume(@Param('resumeId') resumeId: string): Promise<string> {
        return await this.resumesService.deleteAsset(resumeId);
    }

    @Get("/resume")
    async searchResumes(@Query() query: SearchAssetRequestDTO): Promise<Array<ResumeDTO>> {
        return [new ResumeDTO()];
    }
}