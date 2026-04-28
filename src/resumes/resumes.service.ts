import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ResumeDTO } from "./resumes.dtos";
import { InjectRepository } from "@nestjs/typeorm";
import { Resume } from "./resume.entity";
import { Repository } from "typeorm";
import { ActorType } from "../actors/actorRef.entity";
import { ActorRefService } from "../actors/actorRef.service";

@Injectable()
export class ResumesService extends ActorRefService {
    private readonly logger: Logger = new Logger('ResumeService')

    constructor(
        @InjectRepository(Resume)
        private readonly resumeRepository: Repository<Resume>,
    ) {
        super();
    }

    async uploadNewResume(actorType: ActorType, actorId: string, documentBase64: string): Promise<ResumeDTO> {
        let resume = new Resume();

        // Validate candidate ID
        await this.validateActor(actorType, actorId);
        resume.actorId = actorId;

        //upload document
        const documentUrl = await this.callExternalDocumentStorageService(documentBase64)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("Failed to upload document to external storage service");
            });
        resume.documentIdentifier = documentUrl;

        await this.resumeRepository.save(resume)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("uploadNewResume() not available");
            });

        return this.resumeToDTO(resume);
    }

    async findResumes(actorType: ActorType, actorId: string): Promise<Array<ResumeDTO>> {
        const resumes = await this.resumeRepository.find({ where: { actorType, actorId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("findResumes() not available");
            });

        let resumeDTOs: Array<ResumeDTO> = [];
        for (const resume of resumes) {
            resumeDTOs.push(this.resumeToDTO(resume));
        }

        return resumeDTOs;
    }

    async deleteResume(resumeId: string): Promise<void> {
        const resume = await this.resumeRepository.findOne({ where: { resumeId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteResume() not available");
            });

        if (!resume) {
            throw new BadRequestException("Resume with ID " + resumeId + " not found");
        }

        await this.resumeRepository.delete({ resumeId })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteCertification() not available");
            });
    }

    private async callExternalDocumentStorageService(documentBase64: string): Promise<string> {
        return "https://example.com/document/12345";
    }

    private resumeToDTO(resume: Resume) {
        let resumeDTO = new ResumeDTO();
        resumeDTO.resumeId = resume.resumeId;
        resumeDTO.actorType = resume.actorType;
        resumeDTO.actorId = resume.actorId;
        resumeDTO.documentIdentifier = resume.documentIdentifier;

        return resumeDTO;
    }
}