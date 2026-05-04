import { Body, Controller, Post } from "@nestjs/common";
import { CreateResumeRequestDTO, ResumeDTO } from "./resumes.dtos";
import { ResumesService } from "./resumes.service";
import { ActorAssetsController } from "../actorAssets/actorAssets.contorller";

@Controller("/resume")
export class ResumesController extends ActorAssetsController {
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