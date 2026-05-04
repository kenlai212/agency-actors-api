import { SocialProvider } from "./socialProfile.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';
import { ActorAssetDTO, ActorAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

export class SocialProfileDTO extends ActorAssetDTO {
    socialProvider: SocialProvider
    url: string
    providerUserId: string
    providerHandle: string
}

export class PostSocialProfileRequestDTO extends ActorAssetRequestDTO {
    @ApiProperty({
        description: 'provider of the social profile, e.g. LinkedIn, GitHub, etc.',
        enum: SocialProvider,
        enumName: 'SocialProvider',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    provider: SocialProvider

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

export class GetSocialProfilesRequestDTO extends ActorAssetRequestDTO {
    @ApiPropertyOptional({
        description: 'The provider of the social profile',
        enum: SocialProvider,
        enumName: 'SocialProvider',
    })
    @IsString()
    @IsOptional()
    @MaxLength(36)
    provider!: SocialProvider

    @ApiPropertyOptional({
        description: 'The handle of the social profile',
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    providerHandle!: string
}