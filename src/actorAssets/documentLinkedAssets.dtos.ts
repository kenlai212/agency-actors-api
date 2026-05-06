import { IsBase64, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ActorAssetDTO, CreateNewAssetRequestDTO } from './actorAssets.dtos';

export class DocumentLinkedAssetDTO extends ActorAssetDTO {
    @ApiProperty({
        description: `Document Identifier`,
        example: 'b69a-6b0709559596'
    })
    documentIdentifier!: string;
}

export class CreateNewDocumentLinkedAssetRequestDTO extends CreateNewAssetRequestDTO {
    @ApiPropertyOptional({
        description: 'document base64 string',
    })
    @IsOptional()
    @IsBase64()
    documentBase64!: string;
}

export class UploadDocumentRequestDTO {
    @ApiPropertyOptional({
        description: 'Asset ID',
        example: `96e4e28e-2404-4a4f-b69a-6b0709559596`
    })
    @IsString()
    @MaxLength(36)
    assetId!: string;

    @ApiProperty({
        description: 'The base64-encoded document string',
    })
    @IsNotEmpty()
    @IsBase64()
    documentBase64: string;
}