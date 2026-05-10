import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateResumeRequestDTO, ResumeDTO } from "./resumes.dtos";
import { ResumesService } from "./resumes.service";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";
import { AuthGuard } from "../auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("/resume")
export class ResumesController extends DocumentLinkedAssetsController {
    constructor(
        private readonly resumesService: ResumesService
    ) {
        super(resumesService)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post("/")
    async uploadResume(@Body() body: CreateResumeRequestDTO): Promise<ResumeDTO> {
        return new ResumeDTO();
    }
}