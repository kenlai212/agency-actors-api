import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ActorAssetDTO, CreateNewAssetRequestDTO, SearchAssetRequestDTO } from "../actorAssets/actorAssets.dtos";
import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export class EmailAddressDTO extends ActorAssetDTO {
    @ApiProperty({
        description: 'Actor emailAddress',
        example: "john.smith@test.com"
    })
    addressString: string;

    @ApiProperty({})
    isLocked: boolean;
}

export class CreateNewEmailAddressRequestDTO extends CreateNewAssetRequestDTO {
    @ApiProperty({
        description: 'Actor emailAddress',
        example: "john.smith@test.com"
    })
    @IsEmail()
    addressString: string;
}

export class SearchEmailAddressesRequestDTO extends SearchAssetRequestDTO {
    @ApiPropertyOptional({
        description: `Actor's Email Address`,
        example: "john.smith@test.com"
    })
    @IsOptional()
    @IsEmail()
    addressString!: string;
}

export class SetLockEmailAddressRequestDTO {
    @ApiPropertyOptional({
        description: 'Actor ID',
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    actorId!: string;

    @ApiProperty({
        description: `Actor's Email Address`,
        example: "john.smith@test.com"
    })
    @IsEmail()
    addressString: string;
}