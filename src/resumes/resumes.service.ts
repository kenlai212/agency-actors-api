import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ResumeDTO } from "./resumes.dtos";
import { InjectRepository } from "@nestjs/typeorm";
import { Resume } from "./resume.entity";
import { Repository } from "typeorm";
import { ActorAssetsService } from "../actorAssets/actorAssets.service";

@Injectable()
export class ResumesService extends ActorAssetsService<Resume> {
    private readonly logger: Logger = new Logger('ResumeService')

    constructor(
        @InjectRepository(Resume)
        private readonly resumeRepository: Repository<Resume>,
    ) {
        super(resumeRepository);
    }

    async uploadNewResume(actorId: string, documentBase64: string): Promise<ResumeDTO> {
        let resume = new Resume();

        // Validate candidate ID
        await this.validateActor(actorId);
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

        return this.entityToDTO(resume);
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

    async deleteResume(assetId: string): Promise<void> {
        const resume = await this.resumeRepository.findOne({ where: { assetId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteResume() not available");
            });

        if (!resume) {
            throw new BadRequestException("Resume with ID " + assetId + " not found");
        }

        await this.resumeRepository.delete({ assetId })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteCertification() not available");
            });
    }

    private async callExternalDocumentStorageService(documentBase64: string): Promise<string> {
        return "https://example.com/document/12345";
    }

    entityToDTO(entity: Resume) {
        let dto = new ResumeDTO(entity);
        dto.documentIdentifier = entity.documentIdentifier;

        return dto;
    }
}