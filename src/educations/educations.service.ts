import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ActorAssetsService, DocumentLinkedAssetsService } from "../actorAssets/actorAssets.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Education } from "./education.entity";
import { Repository } from "typeorm";
import { EducationDetails, EducationDTO } from "./educations.dtos";

@Injectable()
export class EducationsService extends DocumentLinkedAssetsService<Education, EducationDTO> {
    readonly logger: Logger = new Logger('EducationsService')

    constructor(
        @InjectRepository(Education)
        private readonly educationRepository: Repository<Education>,
    ) {
        super(educationRepository);
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

    entityToDTO(entity: Education) {
        let dto = new EducationDTO(entity);
        dto.institutionName = entity.institutionName;
        dto.degree = entity.degree;
        dto.fieldOfStudy = entity.fieldOfStudy;
        dto.startYear = entity.startYear;
        dto.endYear = entity.endYear;
        dto.documentIdentifier = entity.documentIdentifier;
        return dto;
    }
}