import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Education } from "./education.entity";
import { Repository } from "typeorm";
import { EducationDTO } from "./educations.dtos";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";

@Injectable()
export class EducationsService extends DocumentLinkedAssetsService<Education, EducationDTO> {
    constructor(
        @InjectRepository(Education)
        private readonly educationRepository: Repository<Education>,
    ) {
        super(educationRepository);
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