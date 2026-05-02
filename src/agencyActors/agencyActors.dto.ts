import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsEmail, IsOptional, IsDate } from 'class-validator';
import { AgencyActorType, Country, Gender } from "./agencyActor.entity";

export class AgencyActorDTO {
    @ApiProperty({
        description: 'Target Agency Actor ID',
        example: "96e4e28e-2404-4a4f-b69a-6b0709559596"
    })
    actorId: string;

    @ApiProperty({
        description: 'Agency Actor Type',
        enum: AgencyActorType,
        enumName: "AgencyActorType"
    })
    agencyActorType: AgencyActorType;

    @ApiProperty({
        description: 'Actor fullname',
        example: "John Smith"
    })
    fullName: string;

    @ApiProperty({
        description: `Actor's Gender, can be MALE, FEMALE, OTHER`,
        enum: Gender,
        enumName: "Gender"
    })
    gender: Gender;

    @ApiProperty({
        description: `Actor's Date of Birth, `,
        example: "YYYY-MM-DD"
    })
    dob: Date;

    @ApiProperty({
        description: 'Record creation datetime',
        example: "YYYY-MM-DDTHH:mm:ss.sssZ"
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Record last update datetime',
        example: "YYYY-MM-DDTHH:mm:ss.sssZ"
    })
    updatedAt: Date;

    @ApiProperty({
        description: `Actor's country of resistence`,
        example: "HK"
    })
    countryOfResidence: Country;

    @ApiProperty({
        description: `Actor's Nationality`,
        example: "HK"
    })
    nationality: Country;
    residencyStatus: string;
}

export class FindAgencyActorRequestDTO {
    agencyActorType: AgencyActorType;
    actorId: string;
}

export class NewAgencyActorRequestDTO {
    @ApiProperty({
        description: `Agency Actor Type`,
        example: AgencyActorType.CANDIDATE
    })
    @IsNotEmpty()
    agencyActorType: AgencyActorType;

    @ApiProperty({
        description: `Actor's Full Name`,
        example: "John Smith"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    fullName: string;

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

    @ApiPropertyOptional({
        description: `Actor's country of residence`,
        example: `${Country.HK}`,
        enum: Country
    })
    @IsOptional()
    countryOfResidence: Country;

    @ApiPropertyOptional({
        description: `Actor's country of residence`,
        example: `${Country.HK}`,
        enum: Country
    })
    @IsOptional()
    nationality: string;

    residencyStatus: string;
}