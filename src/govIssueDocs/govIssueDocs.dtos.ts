import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';
import { ActorAssetDTO, CreateNewAssetRequestDTO, CreateNewDocumentLinkedAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

export class GovIssueDocDTO extends ActorAssetDTO {
    documentIdentifier: string;
    issuerCountryCode: string;
    idType: string;
    idNumber: string;
}

export class NewGovIssueDocRequestDTO extends CreateNewDocumentLinkedAssetRequestDTO {
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
        description: 'doc unique identifier',
    })
    @IsNotEmpty()
    @IsString()
    docNumber: string;
}