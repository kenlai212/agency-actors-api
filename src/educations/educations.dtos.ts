import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { DocumentLinkedAssetDTO } from "../actorAssets/documentLinkedAssets.dtos";
import { CreateNewAssetRequestDTO, UpdateAssetRequestDTO } from "../actorAssets/actorAssets.dtos";
import { LevelOfEducation } from "./education.entity";

export class EducationDTO extends DocumentLinkedAssetDTO {
    @ApiProperty({
        description: 'Name of Insititution',
        example: `University of Beijing`
    })
    institutionName!: string;

    @ApiProperty({
        description: `Level of Education : ${Object.keys(LevelOfEducation)}`,
        example: LevelOfEducation.MASTERS,
        enum: LevelOfEducation,
        enumName: "LevelOfEducation"
    })
    levelOfEducation!: LevelOfEducation;

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
    @ApiProperty({
        description: 'Name of Insititution',
        example: `University of Beijing`
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    institutionName: string;

    @ApiPropertyOptional({
        description: `Level of Education : ${Object.keys(LevelOfEducation)}`,
        example: LevelOfEducation.MASTERS,
        enum: LevelOfEducation,
        enumName: "LevelOfEducation"
    })
    @IsEnum(LevelOfEducation)
    @IsOptional()
    levelOfEducation: LevelOfEducation;

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

export class UpdateEducationRequestDTO extends UpdateAssetRequestDTO {
    @ApiPropertyOptional({
        description: 'Name of Insititution',
        example: `University of Beijing`
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    institutionName: string;

    @ApiPropertyOptional({
        description: `Level of Education : ${Object.keys(LevelOfEducation)}`,
        example: LevelOfEducation.MASTERS,
        enum: LevelOfEducation,
        enumName: "LevelOfEducation"
    })
    @IsEnum(LevelOfEducation)
    @IsOptional()
    levelOfEducation: LevelOfEducation;

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