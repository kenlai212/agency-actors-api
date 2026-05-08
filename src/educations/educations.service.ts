import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Education } from "./education.entity";
import { Repository } from "typeorm";
import { EducationDTO, NewEducationRequestDTO } from "./educations.dtos";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";

@Injectable()
export class EducationsService extends DocumentLinkedAssetsService<Education, EducationDTO> {
    constructor(
        @InjectRepository(Education)
        private readonly educationRepository: Repository<Education>,
    ) {
        super(educationRepository);
    }

    async createNewEducation(dto: NewEducationRequestDTO): Promise<EducationDTO> {
        let entity = new Education();

        await this.validateActor(dto.actorId);
        entity.actorId = dto.actorId;

        entity.institutionName = dto.institutionName;
        entity.levelOfEducation = dto.levelOfEducation;
        entity.fieldOfStudy = dto.fieldOfStudy;
        entity.startYear = dto.startYear;
        entity.endYear = dto.endYear;

        entity = await this.educationRepository.save(entity)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEducation() not available");
            });

        return this.entityToDTO(entity);
    }

    entityToDTO(entity: Education) {
        let dto = new EducationDTO(entity);
        dto.institutionName = entity.institutionName;
        dto.levelOfEducation = entity.levelOfEducation;
        dto.fieldOfStudy = entity.fieldOfStudy;
        dto.startYear = entity.startYear;
        dto.endYear = entity.endYear;
        return dto;
    }
}