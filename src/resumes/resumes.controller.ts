import { Body, Controller, Post } from "@nestjs/common";
import { CreateResumeRequestDTO, ResumeDTO } from "./resumes.dtos";
import { ResumesService } from "./resumes.service";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";

@Controller("/resume")
export class ResumesController extends DocumentLinkedAssetsController {
    constructor(
        private readonly resumesService: ResumesService
    ) {
        super(resumesService)
    }

    @Post("/")
    async uploadResume(@Body() body: CreateResumeRequestDTO): Promise<ResumeDTO> {
        return new ResumeDTO();
    }
}