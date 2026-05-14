import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IssueDocType, IssuerGoverment } from "./govIssueDoc.entity";
import { DocumentLinkedAssetDTO } from "../actorAssets/documentLinkedAssets.dtos";
import { CreateNewAssetRequestDTO, UpdateAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

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
    @IsEnum(IssuerGoverment)
    issuerGoverment: IssuerGoverment;

    @ApiPropertyOptional({
        description: `Issue Document Type : ${Object.keys(IssueDocType)}`,
        example: IssueDocType.IDENTITY_CARD
    })
    @IsOptional()
    issueDocType: IssueDocType;

    @ApiPropertyOptional({
        description: 'doc unique identifier',
        example: "HK12345"
    })
    @IsOptional()
    @IsString()
    issueDocNumber: string;
}

export class UpdateGovIssueDocRequestDTO extends UpdateAssetRequestDTO {
    @ApiPropertyOptional({
        description: `Issuer Goverment : ${Object.keys(IssuerGoverment)}`,
        example: IssuerGoverment.HK
    })
    @IsOptional()
    @IsEnum(IssuerGoverment)
    issuerGoverment: IssuerGoverment;

    @ApiPropertyOptional({
        description: `Issue Document Type : ${Object.keys(IssueDocType)}`,
        example: IssueDocType.IDENTITY_CARD
    })
    @IsOptional()
    issueDocType: IssueDocType;

    @ApiPropertyOptional({
        description: 'doc unique identifier',
        example: "HK12345"
    })
    @IsOptional()
    @IsString()
    issueDocNumber: string;
}