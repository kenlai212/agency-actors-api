import { Injectable, Logger } from "@nestjs/common";
import { AgencyActorsService } from "../agencyActors/agencyActors.service";
import { CertificationsService } from "../certifications/certifications.service";
import { EducationsService } from "../educations/educations.service";
import { AgencyActorReadDTO } from "./agencyActorsRead.dtos";
import { AgencyActorType } from "../agencyActors/agencyActor.entity";
import { EmailAdddressesService } from "../emailAddresses/emailAddresses.service";
import { EmploymentsService } from "../employments/employments.service";

@Injectable()
export class AgencyActorsReadService {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        private readonly agencyActorsService: AgencyActorsService,
        private readonly certificationsService: CertificationsService,
        private readonly educationsService: EducationsService,
        private readonly emailAddressesService: EmailAdddressesService,
        private readonly employmentsService: EmploymentsService
    ) { }

    async findActor(actorId: string): Promise<AgencyActorReadDTO> {
        let dto = new AgencyActorReadDTO;

        let agencyActorDTO = await this.agencyActorsService.findAgencyActor(AgencyActorType.CANDIDATE, actorId);
        dto.actorId = agencyActorDTO.actorId;
        dto.agencyActorType = agencyActorDTO.agencyActorType;
        dto.fullName = agencyActorDTO.fullName;
        dto.gender = agencyActorDTO.gender;
        dto.nationality = agencyActorDTO.nationality;
        dto.residencyStatus = agencyActorDTO.residencyStatus;
        dto.countryOfResidence = agencyActorDTO.countryOfResidence;
        dto.residencyStatus = agencyActorDTO.residencyStatus;

        dto.certifications = await this.certificationsService.searchAssetsByActorId(actorId);

        dto.educations = await this.educationsService.searchAssetsByActorId(actorId);

        dto.emailAddresses = await this.emailAddressesService.searchAssetsByActorId(actorId);

        dto.employments = await this.employmentsService.searchAssetsByActorId(actorId);

        return dto;
    }
}