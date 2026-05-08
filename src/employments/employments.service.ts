import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
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

    async createNewEmployment(dto: NewEmploymentRequestDTO): Promise<EmploymentDTO> {
        let entity = new Employment();

        await this.validateActor(dto.actorId);
        entity.actorId = dto.actorId;

        entity.companyName = dto.companyName;
        entity.jobTitle = dto.jobTitle;
        entity.location = dto.location;
        entity.startDate = dto.startDate;

        if (dto.endDate) {
            entity.endDate = dto.endDate;
            entity.isCurrent = false;
        } else {
            entity.isCurrent = true;
        }

        entity = await this.entityRepository.save(entity)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEmployment() not available");
            })

        return this.entityToDTO(entity);
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