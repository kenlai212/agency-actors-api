import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ActorAssetsService } from "../actorAssets/actorAssets.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Employment } from "./employment.entity";
import { Repository } from "typeorm";
import { EmploymentDTO, NewEmploymentRequestDTO } from "./employments.dtos";

@Injectable()
export class EmploymentsService extends ActorAssetsService<Employment> {
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

    async searchEmployment(actorId?: string, employmentId?: string): Promise<EmploymentDTO[]> {
        let whereClause = {}

        if (actorId)
            whereClause = { actorId }
        else
            whereClause = { employmentId }

        let employments = await this.employmentRepository.find({ where: whereClause })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("searchEmployment() not available");
            })

        let employmentDTOs = []
        for (let employment of employments) {
            employmentDTOs.push(this.entityToDTO(employment));
        }

        return employmentDTOs;
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