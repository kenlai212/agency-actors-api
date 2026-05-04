import { IsBase64, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ActorAsset } from './actorAsset.entity';

export class ActorAssetDTO {
    @ApiProperty({
        description: `Actor ID`,
        example: '96e4e28e'
    })
    actorId: string;

    @ApiProperty({
        description: `Asset ID`,
        example: 'b69a-6b0709559596'
    })
    assetId: string;

    @ApiProperty({
        description: 'Record creation datetime',
        example: 'YYYY-MM-DDTHH:mm:ss.sssZ'
    })
    createdAt: Date

    @ApiProperty({
        description: 'Record last update datetime',
        example: 'YYYY-MM-DDTHH:mm:ss.sssZ'
    })
    updatedAt: Date

    constructor(entity?: ActorAsset) {
        if (entity) {
            this.actorId = entity.actorId;
            this.assetId = entity.assetId;
            this.createdAt = entity.createdAt;
            this.updatedAt = entity.updatedAt;
        }
    }
}

export class CreateNewAssetRequestDTO {
    @ApiProperty({
        description: 'Actor ID',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    actorId: string;
}

export class CreateNewDocumentLinkedAssetRequestDTO extends CreateNewAssetRequestDTO {
    @ApiPropertyOptional({
        description: 'document base64 string',
    })
    @IsOptional()
    @IsBase64()
    documentBase64!: string;
}

export class SearchAssetRequestDTO {
    @ApiPropertyOptional({
        description: 'Actor ID',
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    actorId!: string;

    @ApiPropertyOptional({
        description: 'Asset ID',
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    assetId!: string;
}

export class UploadDocumentRequestDTO {
    @ApiProperty({
        description: 'Asset ID',
        example: `96e4e28e-2404-4a4f-b69a-6b0709559596`
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    assetId: string;

    @ApiProperty({
        description: 'The base64-encoded document string',
    })
    @IsNotEmpty()
    @IsBase64()
    documentBase64: string;
}