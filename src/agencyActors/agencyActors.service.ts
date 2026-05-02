import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ActorType, AgencyActor } from "./agencyActor.entity";
import { Repository } from "typeorm";
import { AgencyActorDTO } from "./agencyActors.dto";

@Injectable()
export class AgencyActorsService {
    private readonly logger = new Logger('AgencyActorsService');

    constructor(
        @InjectRepository(AgencyActor)
        private readonly agencyActorRepository: Repository<AgencyActor>,
    ) { }

    async createAgencyActor(fullName: string): Promise<AgencyActorDTO> {
        let agencyActor = new AgencyActor();
        agencyActor.fullName = fullName;

        await this.agencyActorRepository.save(agencyActor)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createCandidate() not available");
            });

        return this.entityToDTO(agencyActor);
    }

    async findAgencyActor(actorType: ActorType, actorId: string): Promise<AgencyActorDTO> {
        let agencyActor = await this.agencyActorRepository.findOne({ where: { actorId, actorType } })
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
        dto.actorType = entity.actorType;
        dto.fullName = entity.fullName;
        dto.gender = entity.gender;
        dto.dob = entity.dob;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }
}