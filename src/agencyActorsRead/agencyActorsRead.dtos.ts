import { ApiProperty } from "@nestjs/swagger";
import { AgencyActorDTO } from "../agencyActors/agencyActors.dto";
import { CertificationDTO } from "../certifications/certifications.dtos";
import { EducationDTO } from "../educations/educations.dtos";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class AgencyActorReadDTO extends AgencyActorDTO {
    certifications: CertificationDTO[];
    educations: EducationDTO[];
}

export class FindAgencyActorReadRequestDTO {
    @ApiProperty({
        description: 'Actor ID',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    actorId: string;
}