import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ActorAssetsService } from "../actorAssets/actorAssets.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Education } from "./education.entity";
import { Repository } from "typeorm";
import { EducationDetails, EducationDTO } from "./educations.dtos";

@Injectable()
export class EducationsService extends ActorAssetsService {
    private readonly logger: Logger = new Logger('EducationsService')

    constructor(
        @InjectRepository(Education)
        private readonly educationRepository: Repository<Education>,
    ) {
        super();
    }

    async createNewEducation(actorId: string, details?: EducationDetails, documentBase64?: string): Promise<EducationDTO> {
        let education = new Education();

        await this.validateActor(actorId);
        education.actorId = actorId;

        if (details) {
            education.institutionName = details.institutionName;
            education.degree = details.degree;
            education.fieldOfStudy = details.fieldOfStudy;
            education.startYear = details.startYear;
            education.endYear = details.endYear;
        }

        if (documentBase64) {
            education.documentIdentifier = await this.callExternalDocumentStorageService(documentBase64);
        }

        education = await this.educationRepository.save(education)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEducation() not available");
            });

        return this.entityToDTO(education);
    }

    async searchEducations(actorId?: string, educationId?: string): Promise<EducationDTO[]> {
        if (!actorId && !educationId)
            throw new BadRequestException(`Must provide one of actorId or educationId`);

        let whereClause = {}
        if (actorId)
            whereClause = { actorId }
        else
            whereClause = { educationId }

        let educations = await this.educationRepository.find({ where: whereClause })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("searchEducations() not available");
            });
        this.logger.debug(`found educations : ${JSON.stringify(educations)}`);

        let educationDTOs = []
        for (let education of educations) {
            educationDTOs.push(this.entityToDTO(education));
        }

        return educationDTOs;
    }

    async uploadDocument(educationId: string, documentBase64: string): Promise<EducationDTO> {
        let education = await this.educationRepository.findOne({ where: { educationId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("uploadDocument() not available");
            });

        if (!education)
            throw new BadRequestException(`Invvalid educationId: ${educationId}`);

        const documentIdentifier = await this.callExternalDocumentStorageService(documentBase64);

        education.documentIdentifier = documentIdentifier;

        education = await this.educationRepository.save(education)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("uploadDocument() not available");
            });

        return this.entityToDTO(education);
    }

    async deleteEducation(educationId: string): Promise<string> {
        let education = await this.educationRepository.findOne({ where: { educationId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteEducation() not available");
            });

        if (!education)
            throw new BadRequestException(`Invalid educationId: ${educationId}`)

        await this.educationRepository.delete(education)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteEducation() not available");
            });

        if (education.documentIdentifier) {
            await this.callExternalDocumentStorageDeleteService(education.documentIdentifier)
                .catch((error) => {
                    this.logger.error(error);
                    throw new InternalServerErrorException("deleteEducation() not available");
                });
        }

        const msg = `Successfully deleted education with id: ${educationId}`
        this.logger.log(msg);
        return msg;
    }

    private async callExternalDocumentStorageDeleteService(documentId: string): Promise<string> {
        return "Successfully deleted";
    }


    private async callExternalDocumentStorageService(documentBase64: string): Promise<string> {
        return "https://example.com/document/12345";
    }

    private entityToDTO(entity: Education) {
        let dto = new EducationDTO;
        dto.educationId = entity.educationId;
        dto.ownerActorId = entity.actorId;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.institutionName = entity.institutionName;
        dto.degree = entity.degree;
        dto.fieldOfStudy = entity.fieldOfStudy;
        dto.startYear = entity.startYear;
        dto.endYear = entity.endYear;
        dto.documentIdentifier = entity.documentIdentifier;
        return dto;
    }
}