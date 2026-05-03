import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsEmail, IsOptional, IsDate, IsDateString } from 'class-validator';
import { AgencyActorType, Country, Gender, ResidencyStatus } from "./agencyActor.entity";

export class AgencyActorDTO {
    @ApiProperty({
        description: 'Target Agency Actor ID',
        example: "96e4e28e-2404-4a4f-b69a-6b0709559596"
    })
    actorId: string;

    @ApiProperty({
        description: `Agency Actor Type : ${Object.keys(AgencyActorType)}`,
        enum: AgencyActorType,
        enumName: "AgencyActorType"
    })
    agencyActorType: AgencyActorType;

    @ApiProperty({
        description: 'Actor fullname',
        example: "Jane Smith"
    })
    fullName: string;

    @ApiPropertyOptional({
        description: `Actor's Gender : ${Object.keys(Gender)}`,
        enum: Gender,
        enumName: "Gender"
    })
    gender!: Gender;

    @ApiPropertyOptional({
        description: `Actor's Date of Birth, `,
        example: "2005-11-30"
    })
    dob!: Date;

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

    @ApiPropertyOptional({
        description: `Actor's country of resistence : : ${Object.keys(Country)}`,
        example: Country.SG
    })
    countryOfResidence: Country;

    @ApiPropertyOptional({
        description: `Actor's Nationality : : ${Object.keys(Country)}`,
        example: Country.HK
    })
    nationality!: Country;

    @ApiPropertyOptional({
        description: `Actor's recidency status : ${Object.keys(ResidencyStatus)}`,
        example: `${ResidencyStatus.EMPLOYMENT_PASS}`
    })
    residencyStatus!: ResidencyStatus;
}

export class FindAgencyActorRequestDTO {
    @ApiProperty({
        description: `Agency Actor Type : ${Object.keys(AgencyActorType)}`,
        enum: AgencyActorType,
        enumName: "AgencyActorType"
    })
    agencyActorType: AgencyActorType;

    @ApiProperty({
        description: 'Target Agency Actor ID',
        example: "96e4e28e-2404-4a4f-b69a-6b0709559596"
    })
    actorId: string;
}

export class NewAgencyActorRequestDTO {
    @ApiProperty({
        description: `Agency Actor Type : ${Object.keys(AgencyActorType)}`,
        example: AgencyActorType.CANDIDATE
    })
    @IsNotEmpty()
    agencyActorType: AgencyActorType;

    @ApiProperty({
        description: `Actor's Full Name`,
        example: "Jane Smith"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    fullName: string;

    @ApiPropertyOptional({
        description: `Actor's gender : ${Object.keys(Gender)}`,
        example: `${Gender.FEMALE}`,
        enum: Gender
    })
    @IsOptional()
    gender: Gender;

    @ApiPropertyOptional({
        description: 'Date of Birth for the Candidate',
        example: `2005-11-30`
    })
    @IsDateString()
    @IsOptional()
    dob: Date;

    @ApiPropertyOptional({
        description: `Actor's country of residence : ${Object.keys(Country)}`,
        example: `${Country.SG}`,
        enum: Country
    })
    @IsOptional()
    countryOfResidence: Country;

    @ApiPropertyOptional({
        description: `Actor's Nationality : ${Object.keys(Country)}`,
        example: `${Country.HK}`,
        enum: Country
    })
    @IsOptional()
    nationality: Country;

    @ApiPropertyOptional({
        description: `Actor's recidency status : ${Object.keys(ResidencyStatus)}`,
        example: `${ResidencyStatus.EMPLOYMENT_PASS}`,
        enum: ResidencyStatus
    })
    @IsOptional()
    residencyStatus: ResidencyStatus;
}