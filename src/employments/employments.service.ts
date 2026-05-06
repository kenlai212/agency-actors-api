import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employment } from "./employment.entity";
import { Repository } from "typeorm";
import { EmploymentDTO, NewEmploymentRequestDTO } from "./employments.dtos";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";

@Injectable()
export class EmploymentsService extends DocumentLinkedAssetsService<Employment, EmploymentDTO> {
    private readonly logger = new Logger('EmploymentsService')

    constructor(
        @InjectRepository(Employment)
        private readonly employmentRepository: Repository<Employment>,
    ) {
        super(employmentRepository);
    }

    async createNewEmployment(dto: NewEmploymentRequestDTO): Promise<EmploymentDTO> {
        let employment = new Employment();

        await this.validateActor(dto.actorId);
        employment.actorId = dto.actorId;

        employment.companyName = dto.companyName;
        employment.jobTitle = dto.jobTitle;
        employment.location = dto.location;
        employment.startDate = dto.startDate;

        if (dto.endDate) {
            employment.endDate = dto.endDate;
            employment.isCurrent = false;
        } else {
            employment.isCurrent = true;
        }

        employment = await this.employmentRepository.save(employment)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEmployment() not available");
            })

        return this.entityToDTO(employment);
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