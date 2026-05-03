import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBase64, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { ActorAssetDTO, ActorAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

export class EducationDTO extends ActorAssetDTO {
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
    startYear!: number;

    @ApiProperty({
        description: 'Final Year of the Education',
        example: `YYYY`
    })
    endYear!: number;

    @ApiProperty({
        description: 'Document ID from storage',
        example: `96e4e28e-2404-4a4f-b69a-6b0709559596`
    })
    documentIdentifier!: string;
}

export class EducationDetails {
    @ApiPropertyOptional({
        description: 'Name of Insititution',
        example: `University of Beijing`
    })
    @IsString()
    @MaxLength(255)
    institutionName!: string;

    @ApiPropertyOptional({
        description: 'Name of Degree',
        example: `Bachelor of Science`
    })
    @IsString()
    @MaxLength(255)
    degree!: string;

    @ApiPropertyOptional({
        description: 'Field of Study',
        example: `Science`
    })
    @IsString()
    @MaxLength(255)
    fieldOfStudy!: string;

    @ApiPropertyOptional({
        description: 'Beginning Year of the Education',
        example: `2004`
    })
    @Min(1900)
    @Max(2100)
    startYear!: number;

    @ApiPropertyOptional({
        description: 'Final Year of the Education',
        example: `2008`
    })
    @Min(1900)
    @Max(2100)
    endYear!: number;
}

export class NewEducationRequestDTO extends ActorAssetRequestDTO {
    @ApiPropertyOptional({
        description: 'Education Details',
    })
    @IsOptional()
    details: EducationDetails

    @ApiPropertyOptional({
        description: 'Document base64 file string',
    })
    @IsBase64()
    @IsOptional()
    documentBase64!: string;
}

export class SearchEducationsRequestDTO {
    @ApiPropertyOptional({
        description: 'Actor ID'
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    actorId: string;

    @ApiPropertyOptional({
        description: 'Education record ID'
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    educationId: string;
}

export class UploadDocumentRequestDTO {
    @ApiProperty({
        description: 'Education ID'
    })
    @IsString()
    @MaxLength(36)
    @IsNotEmpty()
    educationId: string;

    @ApiProperty({
        description: 'Document base64 file string',
    })
    @IsBase64()
    @IsNotEmpty()
    documentBase64!: string;
}