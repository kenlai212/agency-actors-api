import { Provider } from "./socialProfile.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';
import { ActorRefDTO, ActorRefRequestDTO } from "../actors/actorRef.dto";

export class SocialProfileDTO extends ActorRefDTO {
    id: string
    provider: Provider
    url: string
    providerUserId: string
    providerHandle: string
}

export class PostSocialProfileRequestDTO extends ActorRefRequestDTO {
    @ApiProperty({
        description: 'provider of the social profile, e.g. LinkedIn, GitHub, etc.',
        enum: Provider,
        enumName: 'Provider',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    provider: Provider

    @ApiProperty({
        description: 'The handle of the social profile',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    providerHandle: string

    @ApiPropertyOptional({
        description: 'The URL of the social profile',
    })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    url!: string

    @ApiPropertyOptional({
        description: 'The user ID of the provider',
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    providerUserId!: string


}

export class GetSocialProfilesRequestDTO extends ActorRefRequestDTO {
    @ApiPropertyOptional({
        description: 'The provider of the social profile',
        enum: Provider,
        enumName: 'Provider',
    })
    @IsString()
    @IsOptional()
    @MaxLength(36)
    provider!: Provider

    @ApiPropertyOptional({
        description: 'The handle of the social profile',
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    providerHandle!: string
}