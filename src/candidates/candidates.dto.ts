import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsEmail, IsOptional } from 'class-validator';

export class CandidateDTO {
    @ApiProperty({
        description: 'Target Candidate ID',
        example: "96e4e28e-2404-4a4f-b69a-6b0709559596"
    })
    candidateId: string;

    @ApiProperty({
        description: 'Candidate fullname',
        example: "John Smith"
    })
    fullName: string;

    @ApiProperty({
        description: 'Candidate emailAddress',
        example: "john.smith@test.com"
    })
    emailAddress: string;

    @ApiProperty({
        description: 'Candidate phoneNumber',
        example: "+852 1234 5678"
    })
    phoneNumber: string;

    @ApiProperty({
        description: 'Candidate creation datetime',
        example: "YYYY-MM-DDTHH:mm:ss.sssZ"
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Candidate last update datetime',
        example: "YYYY-MM-DDTHH:mm:ss.sssZ"
    })
    updatedAt: Date;

    constructor(fullName: string) {
        this.fullName = fullName;
    }
}

export class findCustomerRequestDTO {
    @ApiProperty({
        description: 'Target Candidate ID',
        example: "96e4e28e-2404-4a4f-b69a-6b0709559596"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    candidateId: string;
}

export class NewCandidateRequestDTO {
    @ApiProperty({
        description: 'Full Name of the Candidate',
        example: "John Smith"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    name: string;

    @ApiPropertyOptional({
        description: 'Email Address of the Candidate',
        example: "john.smith@test.com"
    })
    @IsEmail()
    @IsOptional()
    emailAddress: string;

    @ApiPropertyOptional({
        description: 'Phone Number of the Candidate, can include country and region codes as well',
        example: "+852 1234 5673"
    })
    @IsString()
    @IsOptional()
    phoneNumber: string;
}

export class UpdateCandidateRequestDTO {
    @ApiProperty({
        description: 'Candidate ID',
        example: "96e4e28e-2404-4a4f-b69a-6b0709559596"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    candidateId: string;

    @ApiPropertyOptional({
        description: 'Full Name of the Candidate',
        example: "John Smith"
    })
    @IsString()
    @IsOptional()
    fullName!: string;

    @ApiPropertyOptional({
        description: 'Email Address of the Candidate',
        example: "john.smith@test.com"
    })
    @IsEmail()
    @IsOptional()
    emailAddress!: string;

    @ApiPropertyOptional({
        description: 'Phone Number of the Candidate, can include country and region codes as well',
        example: "+852 1234 5673"
    })
    @IsString()
    @IsOptional()
    phoneNumber!: string;
}