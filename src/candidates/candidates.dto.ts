import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsEmail, IsOptional, IsDate } from 'class-validator';
import { AgencyActorDTO } from "../agencyActors/agencyActors.dto";
import { Gender } from "../agencyActors/agencyActor.entity";

export class CandidateDTO extends AgencyActorDTO {
    @ApiProperty({
        description: 'Target Candidate ID',
        example: "96e4e28e-2404-4a4f-b69a-6b0709559596"
    })
    candidateId: string;
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

    @ApiPropertyOptional({
        description: 'Gender of the Candidate',
        example: `${Gender.FEMALE}`,
        enum: Gender
    })
    @IsOptional()
    gender: Gender;

    @ApiPropertyOptional({
        description: 'Date of Birth for the Candidate',
        example: `YYYY-MM-DD`
    })
    @IsDate()
    @IsOptional()
    dob: Date;
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