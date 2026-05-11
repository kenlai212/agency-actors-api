import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employment } from "./employment.entity";
import { Repository } from "typeorm";
import { EmploymentDTO, NewEmploymentRequestDTO, UpdateEmploymentRequestDTO } from "./employments.dtos";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";
import { CreateNewAssetRequestDTO, UpdateAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

@Injectable()
export class EmploymentsService extends DocumentLinkedAssetsService<Employment, EmploymentDTO> {
    constructor(
        @InjectRepository(Employment)
        private readonly entityRepository: Repository<Employment>,
    ) {
        super(entityRepository);
    }

    async updateAssetDtoToEntity(dto: UpdateEmploymentRequestDTO): Promise<Employment> {
        let entity = await this.validateAssetId(dto.assetId);

        if (dto.companyName)
            entity.companyName = dto.companyName;

        if (dto.jobTitle)
            entity.jobTitle = dto.jobTitle;

        if (dto.location)
            entity.location = dto.location;

        if (dto.startDate)
            entity.startDate = dto.startDate;

        if (dto.endDate) {
            entity.endDate = dto.endDate;
            entity.isCurrent = false;
        } else {
            entity.isCurrent = true;
        }

        return entity;
    }

    async createNewAssetDtoToEntity(dto: NewEmploymentRequestDTO): Promise<Employment> {
        let entity = new Employment();

        await this.validateActor(dto.actorId);
        entity.actorId = dto.actorId;

        entity.companyName = dto.companyName;

        if (dto.jobTitle)
            entity.jobTitle = dto.jobTitle;

        if (dto.location)
            entity.location = dto.location;

        if (dto.startDate)
            entity.startDate = dto.startDate;

        if (dto.endDate) {
            entity.endDate = dto.endDate;
            entity.isCurrent = false;
        } else {
            entity.isCurrent = true;
        }

        return entity;
    }

    entityToDTO(entity: Employment) {
        let dto = new EmploymentDTO(entity);
        dto.companyName = entity.companyName;
        dto.jobTitle = entity.jobTitle;
        dto.location = entity.location;
        dto.startDate = entity.startDate;
        dto.endDate = entity.endDate;
        dto.isCurrent = entity.isCurrent;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;

        return dto;
    }
}