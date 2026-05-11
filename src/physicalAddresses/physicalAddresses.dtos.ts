import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { CreateNewAssetRequestDTO } from "../actorAssets/actorAssets.dtos";
import { DocumentLinkedAssetDTO } from "../actorAssets/documentLinkedAssets.dtos";
import { PhysicalAddressType } from "./physicalAddress.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PhysicalAddressDTO extends DocumentLinkedAssetDTO {
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    addressLine5: string;
    addressType: PhysicalAddressType;
}

export class CreateNewPhysicalAddressRequestDTO extends CreateNewAssetRequestDTO {
    @ApiPropertyOptional({
        description: 'Address Line 1',
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    addressLine1: string;

    @ApiPropertyOptional({
        description: 'Address Line 2',
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    addressLine2: string;

    @ApiPropertyOptional({
        description: 'Address Line 3',
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    addressLine3: string;

    @ApiPropertyOptional({
        description: 'Address Line 4',
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    addressLine4: string;

    @ApiPropertyOptional({
        description: 'Address Line 5',
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    addressLine5: string;

    @ApiProperty({
        description: `Address Type : ${Object.keys(PhysicalAddressType)}`,
        enum: PhysicalAddressType,
        enumName: "PhysicalAddressType"
    })
    @IsNotEmpty()
    @IsEnum(PhysicalAddressType)
    addressType: PhysicalAddressType;
}