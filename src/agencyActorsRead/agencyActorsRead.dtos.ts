import { ApiProperty } from "@nestjs/swagger";
import { AgencyActorDTO } from "../agencyActors/agencyActors.dto";
import { CertificationDTO } from "../certifications/certifications.dtos";
import { EducationDTO } from "../educations/educations.dtos";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { EmailAddressDTO } from "../emailAddresses/emailAddresses.dtos";
import { EmploymentDTO } from "../employments/employments.dtos";
import { GovIssueDocDTO } from "../govIssueDocs/govIssueDocs.dtos";
import { NationalityDTO } from "../nationalities/nationalities.dtos";

export class AgencyActorReadDTO extends AgencyActorDTO {
    @ApiProperty()
    certifications: CertificationDTO[];

    @ApiProperty()
    educations: EducationDTO[];

    @ApiProperty()
    emailAddresses: EmailAddressDTO[];

    @ApiProperty()
    employments: EmploymentDTO[];

    @ApiProperty()
    govIssueDocs: GovIssueDocDTO[];

    @ApiProperty()
    nationalities: NationalityDTO[];
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