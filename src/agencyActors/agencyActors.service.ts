import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AgencyActorType, AgencyActor } from "./agencyActor.entity";
import { Repository } from "typeorm";
import { AgencyActorDTO, NewAgencyActorRequestDTO, UpdateAgencyActorDTO } from "./agencyActors.dto";

@Injectable()
export class AgencyActorsService {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @InjectRepository(AgencyActor)
        private readonly entityRepository: Repository<AgencyActor>,
    ) { }

    async createAgencyActor(dto: NewAgencyActorRequestDTO): Promise<AgencyActorDTO> {
        let agencyActor = new AgencyActor();
        agencyActor.fullName = dto.fullName;

        agencyActor.dob = dto.dob;
        agencyActor.gender = dto.gender;
        agencyActor.nationality = dto.nationality;
        agencyActor.countryOfResidence = dto.countryOfResidence;
        agencyActor.agencyActorType = dto.agencyActorType;
        agencyActor.residencyStatus = dto.residencyStatus;

        await this.entityRepository.save(agencyActor)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createCandidate() not available");
            });

        return this.entityToDTO(agencyActor);
    }

    async findAgencyActor(agencyActorType: AgencyActorType, actorId: string): Promise<AgencyActorDTO> {
        let agencyActor = await this.entityRepository.findOne({ where: { actorId, agencyActorType } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("getCandidateById() not available");
            });

        if (!agencyActor) {
            throw new NotFoundException("Agency Actor not found");
        }

        return this.entityToDTO(agencyActor);
    }

    async deleteActor(actorId: string): Promise<string> {
        let actor = await this.entityRepository.findOne({ where: { actorId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteActor() not available");
            });

        if (!actor) {
            throw new NotFoundException("Actor not found");
        }
        await this.entityRepository.remove(actor)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteActor() not available");
            });

        //delete assets

        const msg = `Successfully deleted ${actorId}`
        this.logger.log(msg);
        return msg;
    }

    async updateAgencyActor(dto: UpdateAgencyActorDTO): Promise<AgencyActorDTO> {
        let agencyActor = await this.entityRepository.findOne({ where: { actorId: dto.actorId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("updateAgencyActor() not available");
            });

        if (!agencyActor)
            throw new NotFoundException(`Invalid actorId ${dto.actorId}`);

        if (dto.agencyActorType)
            agencyActor.agencyActorType = dto.agencyActorType;

        if (dto.fullName)
            agencyActor.fullName = dto.fullName;

        if (dto.gender)
            agencyActor.gender = dto.gender;

        if (dto.countryOfResidence)
            agencyActor.countryOfResidence = dto.countryOfResidence;

        if (dto.residencyStatus)
            agencyActor.residencyStatus = dto.residencyStatus;

        if (dto.nationality)
            agencyActor.nationality = dto.nationality;

        agencyActor = await this.entityRepository.save(agencyActor)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("updateAgencyActor() not available");
            });

        return this.entityToDTO(agencyActor);
    }

    async validateActorId(actorId: string) {
        const candidate = await this.entityRepository.findOne({ where: { actorId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("validateActorId() not available");
            });

        if (!candidate)
            throw new BadRequestException(`Invalid actorId : ${actorId}`)
    }

    private entityToDTO(entity: AgencyActor): AgencyActorDTO {
        let dto = new AgencyActorDTO();
        dto.actorId = entity.actorId;
        dto.agencyActorType = entity.agencyActorType;
        dto.fullName = entity.fullName;
        dto.gender = entity.gender;
        dto.dob = entity.dob;
        dto.countryOfResidence = entity.countryOfResidence;
        dto.nationality = entity.nationality;
        dto.residencyStatus = entity.residencyStatus;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }
}