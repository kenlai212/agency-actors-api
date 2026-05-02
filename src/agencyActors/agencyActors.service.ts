import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AgencyActorType, AgencyActor } from "./agencyActor.entity";
import { Repository } from "typeorm";
import { AgencyActorDTO, NewAgencyActorRequestDTO } from "./agencyActors.dto";

@Injectable()
export class AgencyActorsService {
    private readonly logger = new Logger('AgencyActorsService');

    constructor(
        @InjectRepository(AgencyActor)
        private readonly agencyActorRepository: Repository<AgencyActor>,
    ) { }

    async createAgencyActor(dto: NewAgencyActorRequestDTO): Promise<AgencyActorDTO> {
        let agencyActor = new AgencyActor();
        agencyActor.fullName = dto.fullName;

        agencyActor.dob = dto.dob;
        agencyActor.gender = dto.gender;
        agencyActor.nationality = dto.nationality;
        agencyActor.countryOfResidence = dto.countryOfResidence;
        agencyActor.agencyActorType = dto.agencyActorType;

        await this.agencyActorRepository.save(agencyActor)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createCandidate() not available");
            });

        return this.entityToDTO(agencyActor);
    }

    async findAgencyActor(agencyActorType: AgencyActorType, actorId: string): Promise<AgencyActorDTO> {
        let agencyActor = await this.agencyActorRepository.findOne({ where: { actorId, agencyActorType } })
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
        let actor = await this.agencyActorRepository.findOne({ where: { actorId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteCandidate() not available");
            });

        if (!actor) {
            throw new NotFoundException("Candidate not found");
        }
        await this.agencyActorRepository.remove(actor)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteCandidate() not available");
            });

        //delete assets

        const msg = `Successfully deleted ${actorId}`
        this.logger.log(msg);
        return msg;
    }

    async validateActorId(actorId: string) {
        const candidate = await this.agencyActorRepository.findOne({ where: { actorId } })
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
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }
}