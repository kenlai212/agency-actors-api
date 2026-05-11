import { Injectable } from "@nestjs/common";
import { ResumeDTO } from "./resumes.dtos";
import { InjectRepository } from "@nestjs/typeorm";
import { Resume } from "./resume.entity";
import { Repository } from "typeorm";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";

@Injectable()
export class ResumesService extends DocumentLinkedAssetsService<Resume, ResumeDTO> {
    constructor(
        @InjectRepository(Resume)
        private readonly resumeRepository: Repository<Resume>,
    ) {
        super(resumeRepository);
    }

    entityToDTO(entity: Resume) {
        let dto = new ResumeDTO(entity);
        return dto;
    }
}