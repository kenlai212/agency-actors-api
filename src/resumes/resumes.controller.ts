import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { GetResumesRequestDTO, ResumeDTO, UploadResumeRequestDTO } from "./resumes.dtos";

@Controller()
export class ResumesController {
    @Post("/resume")
    async uploadResume(@Body() body: UploadResumeRequestDTO): Promise<ResumeDTO> {
        return new ResumeDTO();
    }

    @Delete("/resume/:resumeId")
    async deleteResume(@Param('resumeId') resumeId: string): Promise<void> {
        return;
    }

    @Get("/resume")
    async getResumes(@Query() query: GetResumesRequestDTO): Promise<Array<ResumeDTO>> {
        return [new ResumeDTO()];
    }
}