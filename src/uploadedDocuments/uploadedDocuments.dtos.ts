import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { StorageFacility, UploadedDocumentType } from "./uploadedDocument.entity";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, max, MaxLength, maxLength } from "class-validator";

export class UploadedDocumentDTO {
    @ApiPropertyOptional({
        description: `Uploaded Document ID`,
    })
    uploadedDocumentId: string;

    @ApiPropertyOptional({
        description: `Uploaded Document belong to this Asset ID`,
    })
    assetId: string;

    @ApiProperty({
        description: `Uploaded Document belong to this Actor Id`,
    })
    actorId: string;

    @ApiProperty({
        description: `Uploaded Document Type ${Object.values(UploadedDocumentType)}`,
        enum: UploadedDocumentType,
        enumName: "UploadedDocumentType"
    })
    uploadedDocumentType: UploadedDocumentType;

    @ApiProperty({
        description: `Storage Facility ${Object.values(StorageFacility)}`,
        enum: StorageFacility,
        enumName: "StorageFacility"
    })
    storageFacility: StorageFacility;

    @ApiProperty({
        description: `Storage Record ID assigned by Storage Facility`,
    })
    storageRecordId: string;

    @ApiProperty({
        description: `Uploaded Timestamp`,
    })
    @IsDate()
    @IsNotEmpty()
    uploadedAt: Date;
}

export class UploadDocumentRequestDTO {
    @ApiProperty({
        description: `Uploaded Document belong to this Actor Id`,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(36)
    actorId: string;

    @ApiProperty({
        description: `Uploaded Document Type ${Object.values(UploadedDocumentType)}`,
        enum: UploadedDocumentType,
        enumName: "UploadedDocumentType"
    })
    @IsNotEmpty()
    @IsEnum(UploadedDocumentType)
    uploadedDocumentType: UploadedDocumentType;

    @ApiProperty({
        description: `Document Base64 string`,
    })
    @IsString()
    @IsNotEmpty()
    documentBase64: string;
}