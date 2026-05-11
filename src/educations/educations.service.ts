import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Education } from "./education.entity";
import { Repository } from "typeorm";
import { EducationDTO, UpdateEducationRequestDTO } from "./educations.dtos";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";

@Injectable()
export class EducationsService extends DocumentLinkedAssetsService<Education, EducationDTO> {
    constructor(
        @InjectRepository(Education)
        private readonly educationRepository: Repository<Education>,
    ) {
        super(educationRepository);
    }

    async updateEducation(dto: UpdateEducationRequestDTO): Promise<EducationDTO> {
        let entity = await this.validateAssetId(dto.assetId);

        if (dto.institutionName)
            entity.institutionName = dto.institutionName;

        if (dto.levelOfEducation)
            entity.levelOfEducation = dto.levelOfEducation;

        if (dto.fieldOfStudy)
            entity.fieldOfStudy = dto.fieldOfStudy;

        if (dto.startYear)
            entity.startYear = dto.startYear;

        if (dto.endYear)
            entity.endYear = dto.endYear;

        return await this.updateAsset(entity);
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