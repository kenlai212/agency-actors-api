import { ApiProperty } from "@nestjs/swagger";
import { ActorAttributeDTO, ActorAttributeRequestDTO } from "../actors/actorAttribute.dto";

export class EmploymentDTO extends ActorAttributeDTO {
    @ApiProperty({
        description: 'Employment Record ID',
        example: '1234567890'
    })
    employmentId: string;

    @ApiProperty({
        description: 'Employment Company name',
        example: 'Manulife'
    })
    companyName: string;

    @ApiProperty({
        description: 'Job Title',
        example: 'Software Engineer'
    })
    jobTitle: string;

    @ApiProperty({
        description: 'Office location',
        example: '123 Main Street, New York, USA'
    })
    location: string;

    @ApiProperty({
        description: 'Start date of employment',
        example: 'YYYY-MM-DD'
    })
    startDate: Date;

    @ApiProperty({
        description: 'End date of employment',
        example: 'YYYY-MM-DD'
    })
    endDate: Date;

    @ApiProperty({
        description: 'Is this current job? TRUE or FALSE',
        example: 'TRUE'
    })
    isCurrent: boolean;
}

export class NewEmploymentRequestDTO extends ActorAttributeRequestDTO {
    @ApiProperty({
    })
    details: EmploymentDTO;

    @ApiProperty({
    })
    documentIdentifier: string;
}

export class searchEmploymentsRequestDTO extends ActorAttributeRequestDTO {
    @ApiProperty({
    })
    employmentId: string
}