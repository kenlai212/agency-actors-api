import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
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

    async findResumes(actorId: string): Promise<Array<ResumeDTO>> {
        const resumes = await this.resumeRepository.find({ where: { actorId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("findResumes() not available");
            });

        let resumeDTOs: Array<ResumeDTO> = [];
        for (const resume of resumes) {
            resumeDTOs.push(this.entityToDTO(resume));
        }

        return resumeDTOs;
    }

    entityToDTO(entity: Resume) {
        let dto = new ResumeDTO(entity);
        return dto;
    }
}