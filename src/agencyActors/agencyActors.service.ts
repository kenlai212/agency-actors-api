import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ActorType, AgencyActor } from "./agencyActor.entity";
import { Repository } from "typeorm";
import { AgencyActorDTO } from "./agencyActors.dto";

@Injectable()
export class AgencyActorsService {
    private readonly logger = new Logger('ActorService');

    constructor(
        @InjectRepository(AgencyActor)
        private readonly agencyActorRepository: Repository<AgencyActor>,
    ) { }

    async createAgencyActor(fullName: string, emailAddress?: string, mobilePhoneNumber?: string): Promise<AgencyActorDTO> {
        let agencyActor = new AgencyActor();
        agencyActor.fullName = fullName;

        await this.checkEmailOrPhoneExists(emailAddress, mobilePhoneNumber)
            .then((exists) => {
                if (exists) {
                    throw new BadRequestException("Email address or phone number already exists");
                }
            });

        if (emailAddress) {
            agencyActor.emailAddress = emailAddress;
        }
        if (mobilePhoneNumber) {
            agencyActor.mobilePhoneNumber = mobilePhoneNumber;
        }

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

    private async checkEmailOrPhoneExists(emailAddress?: string, mobilePhoneNumber?: string): Promise<boolean> {
        if (!emailAddress && !mobilePhoneNumber) {
            return false;
        }

        const existingCandidate = await this.agencyActorRepository.findOne({
            where: [
                { emailAddress },
                { mobilePhoneNumber }
            ]
        });

        return !!existingCandidate;
    }

    private entityToDTO(entity: AgencyActor): AgencyActorDTO {
        let dto = new AgencyActorDTO();
        dto.actorId = entity.actorId;
        dto.actorType = entity.actorType;
        dto.fullName = entity.fullName;
        dto.emailAddress = entity.emailAddress;
        dto.mobilePhoneNumber = entity.mobilePhoneNumber;
        dto.gender = entity.gender;
        dto.dob = entity.dob;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }
}