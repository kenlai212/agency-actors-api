import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ActorAssetDTO, ActorAssetRequestDTO } from "../actorAssets/actorAssets.dtos";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class EmploymentDTO extends ActorAssetDTO {
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

export class NewEmploymentRequestDTO extends ActorAssetRequestDTO {
    @ApiProperty({
        description: 'Employment Company name',
        example: 'Manulife'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(128)
    companyName: string;

    @ApiProperty({
        description: 'Job Title',
        example: 'Software Engineer'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(128)
    jobTitle: string;

    @ApiProperty({
        description: 'Office location',
        example: '123 Main Street, New York, USA'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    location: string;

    @ApiProperty({
        description: 'Start date of employment',
        example: 'YYYY-MM-DD'
    })
    @IsNotEmpty()
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

export class searchEmploymentsRequestDTO {
    @ApiPropertyOptional({
        description: 'Actor ID',
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    actorId!: string

    @ApiPropertyOptional({
        description: 'Employment Record ID',
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    employmentId!: string
}