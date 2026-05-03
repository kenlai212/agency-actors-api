import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ActorAssetDTO {
    @ApiProperty({
        description: 'The ID of the Actor, either agent or candidate',
        example: '96e4e28e-2404-4a4f-b69a-6b0709559596'
    })
    ownerActorId: string;

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