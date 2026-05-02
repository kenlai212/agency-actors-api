import { ApiProperty } from "@nestjs/swagger";
import { ActorAssetDTO } from "../actorAssets/actorAssets.dtos";
import { PhoneType } from "./phoneNumber.entity";

export class PhoneNumberDTO extends ActorAssetDTO {
    @ApiProperty({})
    countryCode: string;

    @ApiProperty({})
    phoneNumber: string;

    @ApiProperty({})
    phoneNumberType: PhoneType;
}

export class CreatePhoneNumberDTO extends ActorAssetDTO {
    @ApiProperty({})
    countryCode: string;

    @ApiProperty({})
    phoneNumber: string;

    @ApiProperty({})
    phoneNumberType: PhoneType;
}

export class SearchPhoneNumberDTO extends ActorAssetDTO {
    @ApiProperty({})
    countryCode: string;

    @ApiProperty({})
    phoneNumber: string;
}