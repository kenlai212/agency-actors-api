import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, Max, MaxLength, Min } from 'class-validator';
import { DocumentLinkedAssetDTO } from "../actorAssets/documentLinkedAssets.dtos";
import { CreateNewAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

export class EducationDTO extends DocumentLinkedAssetDTO {
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
}

export class NewEducationRequestDTO extends CreateNewAssetRequestDTO {
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