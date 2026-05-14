import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ActorAssetDTO, CreateNewAssetRequestDTO, FindAssetRequestDTO } from "../actorAssets/actorAssets.dtos";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class EmailAddressDTO extends ActorAssetDTO {
    @ApiProperty({
        description: 'Actor emailAddress',
        example: "john.smith@test.com"
    })
    addressString: string;

    @ApiProperty({
        description: 'Default Email Address, one per Actor',
    })
    isDefault: boolean;
}

export class CreateNewEmailAddressRequestDTO extends CreateNewAssetRequestDTO {
    @ApiProperty({
        description: 'Actor emailAddress',
        example: "john.smith@test.com"
    })
    @IsEmail()
    addressString: string;
}

export class CheckExistingEmailAddressRequestDTO {
    @ApiProperty({
        description: `Actor's Email Address`,
        example: "john.smith@test.com"
    })
    @IsNotEmpty()
    @IsEmail()
    addressString!: string;
}

export class FindEmailAddressRequestDTO {
    @ApiPropertyOptional({
        description: 'Asset ID',
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    assetId!: string;

    @ApiPropertyOptional({
        description: `Actor's Email Address`,
        example: "john.smith@test.com"
    })
    @IsOptional()
    @IsEmail()
    addressString!: string;
}

export class SetDefaultEmailAddressRequestDTO {
    @ApiProperty({
        description: 'Actor ID',
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    actorId: string;

    @ApiProperty({
        description: `Actor's Email Address`,
        example: "john.smith@test.com"
    })
    @IsEmail()
    addressString: string;
}