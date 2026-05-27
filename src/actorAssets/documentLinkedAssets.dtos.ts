import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { ActorAssetDTO } from './actorAssets.dtos';
import { DocumentLinkedAsset } from './documentLinkedAsset.entity';

export class DocumentLinkedAssetDTO extends ActorAssetDTO {
    @ApiProperty({
        description: `Uploaded Document ID`,
        example: 'b69a-6b0709559596'
    })
    uploadedDocumentId!: string;

    constructor(entity?: DocumentLinkedAsset) {
        super();

        if (entity) {
            this.actorId = entity.actorId;
            this.assetId = entity.assetId;
            this.createdAt = entity.createdAt;
            this.updatedAt = entity.updatedAt;

            if (entity.uploadedDocumentId)
                this.uploadedDocumentId = entity.uploadedDocumentId;
        }
    }
}

export class UpdateDocumentIdRequestDTO {
    @ApiProperty({
        description: 'Asset ID',
        example: `96e4e28e-2404-4a4f-b69a-6b0709559596`
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(36)
    assetId: string;

    @ApiProperty({
        description: 'Uploaded Document ID',
        example: `96e4e28e-2404-4a4f-b69a-6b0709559596`
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(36)
    uploadedDocumentId: string;
}