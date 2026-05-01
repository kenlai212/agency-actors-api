import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, MaxLength } from 'class-validator';
import { ActorAttributeDTO, ActorAttributeRequestDTO } from "../actors/actorAttribute.dto";

export class EducationDTO extends ActorAttributeDTO {
    @ApiProperty({
        description: 'Education record ID',
        example: `96e4e28e-2404-4a4f-b69a-6b0709559596`
    })
    educationId!: string;

    @ApiProperty({
        description: 'Name of Insititution',
        example: `University of Beijing`
    })
    institutionName!: string;

    @ApiProperty({
        description: 'Name of the Degree',
        example: `Bachelor of Science`
    })
    degree!: string;

    @ApiProperty({
        description: 'Field of Study',
        example: `Science`
    })
    fieldOfStudy!: string;

    @ApiProperty({
        description: 'Beginning Year of the Education',
        example: `YYYY`
    })
    startYear!: string;

    @ApiProperty({
        description: 'Final Year of the Education',
        example: `YYYY`
    })
    endYear!: string;

    @ApiProperty({
        description: 'Document ID from storage',
        example: `96e4e28e-2404-4a4f-b69a-6b0709559596`
    })
    documentIdentifier!: string;
}

class EducationDetails {
    @ApiPropertyOptional({
        description: 'Name of Insititution',
    })
    @IsString()
    @MaxLength(255)
    institutionName!: string;

    @ApiPropertyOptional({
        description: 'Name of Degree',
    })
    @IsString()
    @MaxLength(255)
    degree!: string;

    @ApiPropertyOptional({
        description: 'Field of Study',
    })
    @IsString()
    @MaxLength(255)
    fieldOfStudy!: string;

    @ApiPropertyOptional({
        description: 'Beginning Year of the Education',
    })
    @IsString()
    @MaxLength(4)
    startYear!: string;

    @ApiPropertyOptional({
        description: 'Final Year of the Education',
    })
    @IsString()
    @MaxLength(4)
    endYear!: string;
}

export class NewEducationRequestDTO extends ActorAttributeRequestDTO {
    @ApiPropertyOptional({
        description: 'Education Details',
    })
    details: EducationDetails

    @ApiPropertyOptional({
        description: 'Document base64 file string',
    })
    @IsString()
    @MaxLength(4)
    documentBase64!: string;
}

export class SearchEducationsRequestDTO extends ActorAttributeRequestDTO {
    @ApiProperty({
        description: 'Education record ID',
        example: `96e4e28e-2404-4a4f-b69a-6b0709559596`
    })
    educationId: string;
}