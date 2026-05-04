import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
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

export class ActorAssetRequestDTO {
    @ApiProperty({
        description: 'Actor ID',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    actorId: string;
}