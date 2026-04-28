import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ActorType } from "./actorRef.entity";

export class ActorRefDTO {
    actorType: ActorType;
    actorId: string;
    createdAt: Date
    updatedAt: Date
}

export class ActorRefRequestDTO {
    @ApiProperty({
        description: 'Actor Type, either agent or candidate',
        enum: ActorType,
        enumName: "ActorType"
    })
    @IsNotEmpty()
    actorType: ActorType;

    @ApiProperty({
        description: 'The ID of the candidate or agent',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    actorId: string;
}