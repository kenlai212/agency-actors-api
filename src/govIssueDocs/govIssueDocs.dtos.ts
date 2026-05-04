import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';
import { ActorAssetDTO, CreateNewAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

export class GovIssueDocDTO extends ActorAssetDTO {
    governmentIdId: string;
    documentIdentifier: string;
    issuerCountryCode: string;
    idType: string;
    idNumber: string;
}

export class NewGovIssueDocRequestDTO extends CreateNewAssetRequestDTO {
    @ApiProperty({
        description: 'document base64 string',
    })
    @IsNotEmpty()
    @IsString()
    documentBase64: string;

    @ApiProperty({
        description: 'issuer goverment country',
    })
    @IsNotEmpty()
    @IsString()
    issuerCountryCode: string;

    @ApiProperty({
        description: 'Type of Goverment issued ID',
    })
    @IsNotEmpty()
    @IsString()
    idType: string;

    @ApiProperty({
        description: 'ID unique identifier',
    })
    @IsNotEmpty()
    @IsString()
    idNumber: string;
}