import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';
import { IssueDocType, IssuerGoverment } from "./govIssueDoc.entity";
import { DocumentLinkedAssetDTO } from "../actorAssets/documentLinkedAssets.dtos";
import { CreateNewAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

export class GovIssueDocDTO extends DocumentLinkedAssetDTO {
    @ApiProperty({
        description: `Issuer Goverment : ${Object.keys(IssuerGoverment)}`,
    })
    issuerGoverment: IssuerGoverment;

    @ApiProperty({
        description: `Document Type : ${Object.keys(IssueDocType)}`,
    })
    issueDocType: IssueDocType;

    @ApiProperty({
        description: `Issued Document Number`,
    })
    issueDocNumber: string;
}

export class NewGovIssueDocRequestDTO extends CreateNewAssetRequestDTO {
    @ApiProperty({
        description: `Issuer Goverment : ${Object.keys(IssuerGoverment)}`,
        example: IssuerGoverment.HK
    })
    @IsNotEmpty()
    issuerGoverment: IssuerGoverment;

    @ApiProperty({
        description: `Issue Document Type : ${Object.keys(IssueDocType)}`,
        example: IssueDocType.IDENTITY_CARD
    })
    @IsNotEmpty()
    issueDocType: IssueDocType;

    @ApiProperty({
        description: 'doc unique identifier',
        example: "HK12345"
    })
    @IsNotEmpty()
    @IsString()
    issueDocNumber: string;
}