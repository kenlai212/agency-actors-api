import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ActorAssetDTO, ActorAssetRequestDTO } from "../actorAssets/actorAssets.dtos";
import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export class EmailAddressDTO extends ActorAssetDTO {
    @ApiProperty({
        description: 'Actor emailAddress',
        example: "john.smith@test.com"
    })
    addressString: string;

    @ApiProperty({})
    isLocked: boolean;
}

export class CreateNewEmailAddressRequestDTO extends ActorAssetRequestDTO {
    @ApiProperty({
        description: 'Actor emailAddress',
        example: "john.smith@test.com"
    })
    @IsEmail()
    addressString: string;
}

export class SearchEmailAddressesRequestDTO {
    @ApiPropertyOptional({
        description: 'Actor ID',
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    actorId!: string;

    @ApiPropertyOptional({
        description: `Actor's Email Address`,
        example: "john.smith@test.com"
    })
    @IsOptional()
    @IsEmail()
    addressString!: string;
}

export class SetLockEmailAddressRequestDTO extends ActorAssetRequestDTO {
    @ApiProperty({
        description: `Actor's Email Address`,
        example: "john.smith@test.com"
    })
    @IsEmail()
    addressString: string;
}