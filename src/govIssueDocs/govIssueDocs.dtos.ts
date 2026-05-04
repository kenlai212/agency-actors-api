import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateNewDocumentLinkedAssetRequestDTO, DocumentLinkedAssetDTO } from "../actorAssets/actorAssets.dtos";

export class GovIssueDocDTO extends DocumentLinkedAssetDTO {
    issuerCountryCode: string;
    documentType: string;
    documentNumber: string;
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