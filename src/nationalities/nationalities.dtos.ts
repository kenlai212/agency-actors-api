import { ApiProperty } from "@nestjs/swagger";
import { DocumentLinkedAssetDTO } from "../actorAssets/documentLinkedAssets.dtos";
import { Country } from "./nationality.entity";
import { CreateNewAssetRequestDTO } from "../actorAssets/actorAssets.dtos";
import { IsEnum, IsNotEmpty } from "class-validator";

export class NationalityDTO extends DocumentLinkedAssetDTO {
    @ApiProperty({
        description: `Actor's Nationality : ${Object.keys(Country)}`,
        example: Country.HK
    })
    country!: Country;
}

export class NewNationalityRequestDTO extends CreateNewAssetRequestDTO {
    @ApiProperty({
        description: `Actor's Nationality Country: ${Object.keys(Country)}`,
        example: `${Country.HK}`,
        enum: Country
    })
    @IsNotEmpty()
    @IsEnum(Country)
    country: Country;
}