import { ApiProperty } from "@nestjs/swagger";
import { AgencyActorDTO } from "../agencyActors/agencyActors.dto";
import { CertificationDTO } from "../certifications/certifications.dtos";
import { EducationDTO } from "../educations/educations.dtos";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { EmailAddressDTO } from "../emailAddresses/emailAddresses.dtos";
import { EmploymentDTO } from "../employments/employments.dtos";
import { GovIssueDocDTO } from "../govIssueDocs/govIssueDocs.dtos";

export class AgencyActorReadDTO extends AgencyActorDTO {
    certifications: CertificationDTO[];
    educations: EducationDTO[];
    emailAddresses: EmailAddressDTO[];
    employments: EmploymentDTO[];
    govIssueDocs: GovIssueDocDTO[]
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