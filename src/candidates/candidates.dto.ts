import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsEmail, IsOptional } from 'class-validator';

export class CandidateDTO {
    candidateId: string;
    name: string;
    emailAddress: string;
    phoneNumber: string;
    resumeUrl: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(name: string) {
        this.name = name;
    }
}

export class NewCandidateRequestDTO {
    @ApiProperty({
        description: 'The ID of the requestor',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    name: string;

    @ApiPropertyOptional({
        description: 'The email of the candidate',
    })
    @IsEmail()
    @IsOptional()
    emailAddress: string;

    @ApiPropertyOptional({
        description: 'The phone number of the candidate',
    })
    @IsString()
    @IsOptional()
    phoneNumber: string;
}

export class UpdateCandidateRequestDTO {
    @ApiProperty({
        description: 'The ID of the requestor',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    candidateId: string;

    @ApiPropertyOptional({
        description: 'The full name of the candidate',
    })
    @IsString()
    @IsOptional()
    fullName!: string;

    @ApiPropertyOptional({
        description: 'The email of the candidate',
    })
    @IsEmail()
    @IsOptional()
    emailAddress!: string;

    @ApiPropertyOptional({
        description: 'The phone number of the candidate',
    })
    @IsString()
    @IsOptional()
    phoneNumber!: string;
}