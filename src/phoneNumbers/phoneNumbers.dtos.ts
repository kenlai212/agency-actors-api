import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ActorAssetDTO, ActorAssetRequestDTO } from "../actorAssets/actorAssets.dtos";
import { CountryCode, PhoneNumberType } from "./phoneNumber.entity";
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class PhoneNumberDTO extends ActorAssetDTO {
    @ApiProperty({
        description: 'PhoneNumber ID',
    })
    phoneNumberId: string;

    @ApiProperty({
        description: 'Phone Number country code',
        enum: CountryCode,
        example: CountryCode.HK
    })
    countryCode: CountryCode;

    @ApiProperty({
        description: 'Phone Number',
        example: "12345678"
    })
    numberString: string;

    @ApiProperty({
        description: 'Phone Number Type',
        enum: PhoneNumberType,
        enumName: "PhoneNumberType",
        example: PhoneNumberType.MOBILE
    })
    phoneNumberType: PhoneNumberType;
}

export class CreatePhoneNumberRequestDTO extends ActorAssetRequestDTO {
    @ApiProperty({
        description: `Phone Number Country Code ${Object.values(CountryCode)}`,
        example: CountryCode.HK,
        enum: CountryCode,
        enumName: "countryCode"
    })
    @IsNotEmpty()
    @IsEnum(CountryCode)
    countryCode: CountryCode;

    @ApiProperty({
        description: `Phone Number String`,
        example: `12345678`
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    numberString: string;

    @ApiProperty({
        description: `Phone Number Type ${Object.values(PhoneNumberType)}`,
        example: PhoneNumberType.MOBILE,
        enum: PhoneNumberType,
        enumName: "PhoneNumberType"
    })
    @IsNotEmpty()
    @IsEnum(PhoneNumberType)
    phoneNumberType: PhoneNumberType;
}

export class SearchPhoneNumberDTO {
    @ApiPropertyOptional({
        description: 'Actor ID',
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    actorId!: string;

    @ApiPropertyOptional({
        description: `Phone Number Country Code ${Object.values(CountryCode)}`,
        example: CountryCode.HK,
        enum: CountryCode,
        enumName: "countryCode"
    })
    @IsOptional()
    @IsEnum(CountryCode)
    countryCode!: CountryCode;

    @ApiPropertyOptional({
        description: `Phone Number String`,
        example: `12345678`
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    numberString!: string;
}