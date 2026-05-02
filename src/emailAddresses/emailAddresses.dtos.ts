import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ActorAssetDTO, ActorAssetRequestDTO } from "../actorAssets/actorAssets.dtos";
import { IsBoolean, IsEmail } from "class-validator";

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

export class SearchEmailAddressesRequestDTO extends ActorAssetRequestDTO { }

export class SetLockEmailAddressRequestDTO extends ActorAssetRequestDTO {
    @ApiProperty({})
    addressString: string;
}