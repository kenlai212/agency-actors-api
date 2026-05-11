import { Controller } from "@nestjs/common";
import { ResumesService } from "./resumes.service";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";

@Controller("/resume")
export class ResumesController extends DocumentLinkedAssetsController {
    constructor(
        private readonly resumesService: ResumesService
    ) {
        super(resumesService)
    }
}