import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateNewDocumentLinkedAssetRequestDTO, DocumentLinkedAssedDTO } from "../actorAssets/actorAssets.dtos";

export class GovIssueDocDTO extends DocumentLinkedAssedDTO {
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