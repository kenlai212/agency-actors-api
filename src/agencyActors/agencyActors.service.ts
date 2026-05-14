import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AgencyActorType, AgencyActor } from "./agencyActor.entity";
import { Repository } from "typeorm";
import { AgencyActorDTO, NewAgencyActorRequestDTO, UpdateAgencyActorDTO } from "./agencyActors.dto";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class AgencyActorsService {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @InjectRepository(AgencyActor)
        private readonly entityRepository: Repository<AgencyActor>,
        private readonly httpService: HttpService
    ) { }

    async createAgencyActor(dto: NewAgencyActorRequestDTO): Promise<AgencyActorDTO> {
        let entity = new AgencyActor();
        entity.fullName = dto.fullName;

        entity.dob = dto.dob;
        entity.gender = dto.gender;
        entity.countryOfResidence = dto.countryOfResidence;
        entity.agencyActorType = dto.agencyActorType;
        entity.residencyStatus = dto.residencyStatus;

        ///////////////////////////validate if the email address is existing//////////////////////////////
        const emailAddressURL = `http://localhost:8080/email-addresses`;
        const checkExistingResponse = await this.httpService.axiosRef.get(`${emailAddressURL}/check-existing?addressString=${dto.emailAddress}`)
            .catch(error => {
                this.logger.error(error);
                throw new InternalServerErrorException("Check existing email address not available");
            })

        if (checkExistingResponse.data)
            throw new BadRequestException(`Existing Email Address : ${dto.emailAddress}`)


        ///////////////////////////save AgencyActor record //////////////////////////
        await this.entityRepository.save(entity)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createCandidate() not available");
            });

        ////////////////////////////create email address record//////////////////////////////////////
        const createEmailAddressResponse = await this.httpService.axiosRef.post(emailAddressURL, {
            actorId: entity.actorId,
            addressString: dto.emailAddress
        })
            .catch(error => {
                this.logger.error(error);
                throw new InternalServerErrorException(`Saving Email Address ${dto.emailAddress} fialed`);
            })
        dto.emailAddress = createEmailAddressResponse.data.addressString;

        this.logger.log(`Created new Agency Actor ${entity.fullName} ${entity.actorId}`)
        return this.entityToDTO(entity);
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

        const actorName = actor.fullName;

        await this.entityRepository.remove(actor)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteActor() not available");
            });

        const msg = `Successfully deleted ${this.entityRepository.metadata.name} ${actorName}`
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
        dto.residencyStatus = entity.residencyStatus;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }
}