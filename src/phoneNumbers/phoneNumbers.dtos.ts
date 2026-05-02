import { ActorAssetDTO } from "../actorAssets/actorAssets.dtos";
import { PhoneType } from "./phoneNumber.entity";

export class PhoneNumberDTO extends ActorAssetDTO {
    countryCode: string;
    phoneNumber: string;
    phoneNumberType: PhoneType;
}

export class CreatePhoneNumberDTO extends ActorAssetDTO {
    countryCode: string;
    phoneNumber: string;
    phoneNumberType: PhoneType;
}

export class SearchPhoneNumberDTO extends ActorAssetDTO {
    countryCode: string;
    phoneNumber: string;
}