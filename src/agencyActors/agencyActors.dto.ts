import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsEmail, IsOptional, IsDate } from 'class-validator';
import { ActorType, Gender } from "./agencyActor.entity";

export class AgencyActorDTO {
    @ApiProperty({
        description: 'Target Agency Actor ID',
        example: "96e4e28e-2404-4a4f-b69a-6b0709559596"
    })
    actorId: string;

    @ApiProperty({
        description: 'Agency Actor Type',
        example: "96e4e28e-2404-4a4f-b69a-6b0709559596"
    })
    actorType: ActorType;

    @ApiProperty({
        description: 'Actor fullname',
        example: "John Smith"
    })
    fullName: string;

    @ApiProperty({
        description: 'Actor emailAddress',
        example: "john.smith@test.com"
    })
    emailAddress: string;

    @ApiProperty({
        description: 'Actor phoneNumber',
        example: "+852 1234 5678"
    })
    mobilePhoneNumber: string;

    @ApiProperty({
        description: `Actor Gender, can be MALE, FEMALE, OTHER`,
        enum: Gender,
        enumName: "Gender"
    })
    gender: Gender;

    @ApiProperty({
        description: `Candidate Date of Birth, `,
        example: "YYYY-MM-DD"
    })
    dob: Date;

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

    countryOfResidence: string;
    nationality: string;
    residencyStatus: string;
    homePhoneNumber: string;
}

export class FindAgencyActorRequestDTO {
    actorType: ActorType;
    actorId: string;
}

export class NewAgencyActorRequestDTO {
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