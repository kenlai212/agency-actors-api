import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { UploadedDocumentType } from "./uploadedDocument.entity";
import { ExtractionJobType } from "./extractionJobs.service";

export class SearchExtractionJobsRequestDTO {
    @ApiProperty({
        description: `Uploaded Document Id`,
    })
    @IsUUID()
    @IsNotEmpty()
    uploadedDocumentId: string;
}

export class NewExtractionJobRequestDTO {
    @ApiProperty({
        description: `Uploaded Document Id`,
    })
    @IsUUID()
    @IsNotEmpty()
    uploadedDocumentId: string;

    @ApiProperty({
        description: `Document Base64`,
    })
    @IsString()
    @IsNotEmpty()
    documentBase64: string;

    @ApiProperty({
        description: `Uploaded Document Type: ${Object.keys(UploadedDocumentType)}`,
    })
    @IsEnum(UploadedDocumentType)
    @IsNotEmpty()
    documentType: UploadedDocumentType;

    @ApiProperty({
        description: `Extraction Job Type: ${Object.keys(ExtractionJobType)}`,
    })
    @IsEnum(ExtractionJobType)
    @IsNotEmpty()
    extractionJobType: ExtractionJobType;
}