import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employment } from "./employment.entity";
import { Repository } from "typeorm";
import { EmploymentDTO, NewEmploymentRequestDTO } from "./employments.dtos";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";

@Injectable()
export class EmploymentsService extends DocumentLinkedAssetsService<Employment, EmploymentDTO> {
    constructor(
        @InjectRepository(Employment)
        private readonly entityRepository: Repository<Employment>,
    ) {
        super(entityRepository);
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