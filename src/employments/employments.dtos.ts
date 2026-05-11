import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { DocumentLinkedAssetDTO } from "../actorAssets/documentLinkedAssets.dtos";
import { CreateNewAssetRequestDTO, UpdateAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

export class EmploymentDTO extends DocumentLinkedAssetDTO {
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

export class NewEmploymentRequestDTO extends CreateNewAssetRequestDTO {
    @ApiProperty({
        description: 'Employment Company name',
        example: 'Manulife'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(128)
    companyName: string;

    @ApiPropertyOptional({
        description: 'Job Title',
        example: 'Software Engineer'
    })
    @IsOptional()
    @IsString()
    @MaxLength(128)
    jobTitle: string;

    @ApiPropertyOptional({
        description: 'Office location',
        example: '123 Main Street, New York, USA'
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    location: string;

    @ApiPropertyOptional({
        description: 'Start date of employment',
        example: 'YYYY-MM-DD'
    })
    @IsOptional()
    @IsDateString()
    startDate: Date;

    @ApiPropertyOptional({
        description: 'End date of employment',
        example: 'YYYY-MM-DD'
    })
    @IsOptional()
    @IsDateString()
    endDate!: Date;

    @ApiPropertyOptional({
        description: 'Is this current job? TRUE or FALSE',
        example: 'TRUE'
    })
    @IsOptional()
    @IsBoolean()
    isCurrent!: boolean;
}

export class UpdateEmploymentRequestDTO extends UpdateAssetRequestDTO {
    @ApiPropertyOptional({
        description: 'Employment Company name',
        example: 'Manulife'
    })
    @IsOptional()
    @IsString()
    @MaxLength(128)
    companyName: string;

    @ApiPropertyOptional({
        description: 'Job Title',
        example: 'Software Engineer'
    })
    @IsOptional()
    @IsString()
    @MaxLength(128)
    jobTitle: string;

    @ApiPropertyOptional({
        description: 'Office location',
        example: '123 Main Street, New York, USA'
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    location: string;

    @ApiPropertyOptional({
        description: 'Start date of employment',
        example: 'YYYY-MM-DD'
    })
    @IsOptional()
    @IsDateString()
    startDate: Date;

    @ApiPropertyOptional({
        description: 'End date of employment',
        example: 'YYYY-MM-DD'
    })
    @IsOptional()
    @IsDateString()
    endDate!: Date;

    @ApiPropertyOptional({
        description: 'Is this current job? TRUE or FALSE',
        example: 'TRUE'
    })
    @IsOptional()
    @IsBoolean()
    isCurrent!: boolean;
}